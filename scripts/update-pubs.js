// 연구실 논문/저서 데이터 자동 업데이트 스크립트
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const CONFIG = {
    url: "https://www.kyonggi.ac.kr/u_computer/contents.do?key=2159",
    files: [
        { name: 'int_publicationsData.js', varName: 'publicationsData', headerKeyword: '국제논문', type: 'International Conference' },
        { name: 'dm_publicationsData.js', varName: 'publicationsData', headerKeyword: '국내논문', type: 'Domestic Journal' },
        { name: 'book_publicationsData.js', varName: 'book_Data', headerKeyword: '저서', type: 'Book' }
    ],
    dataPath: path.join(__dirname, '../src/data')
};

function getExistingDataCount(filePath) {
    if (!fs.existsSync(filePath)) return 0;
    const content = fs.readFileSync(filePath, 'utf8');
    // id: 대신 "id": 패턴을 사용 (JSON 스타일)
    const match = content.match(/"id"\s*:/g);
    return match ? match.length : 0;
}

async function updatePublications() {
    let browser;
    let page; // [수정] catch 블록에서 에러 스크린샷을 찍기 위해 page 변수 스코프를 상단으로 이동

    try {
        console.log("🚀 [1단계] 가상 브라우저 실행 중...");

        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 }); // 화면 크기 설정 (버튼 클릭 위해)
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log("🚀 [2단계] 페이지 접속 및 동적 데이터 렌더링 대기 중...");
        await page.goto(CONFIG.url, { waitUntil: 'networkidle2', timeout: 60000 });

        // [핵심 로직 추가] 학교 서버에서 AJAX로 교수진 데이터를 가져와 화면에 그릴 때까지 명시적으로 대기
        // 네트워크 상태에 따라 렌더링 속도가 다를 수 있으므로, 하드코딩된 시간 대신 요소가 나타날 때까지 기다립니다 (최대 15초).
        await page.waitForSelector('.employee_item', { visible: true, timeout: 15000 });
        console.log("✅ 데이터 렌더링 완료.");

        // 1차 디버깅 파일 저장 (접속 및 렌더링 직후)
        fs.writeFileSync('debug_step1_load.html', await page.content());
        console.log("📸 [디버깅] 접속 직후 화면 저장 완료 (debug_step1_load.html)");

        console.log("🔍 [3단계] '김남기' 교수님 찾는 중...");

        // Puppeteer 컨텍스트에서 요소 찾기 및 클릭
        const found = await page.evaluate(async () => {
            const items = document.querySelectorAll('.employee_item');
            for (const item of items) {
                const nameEl = item.querySelector('.name_wrap .name');
                if (nameEl && nameEl.textContent.trim() === '김남기') {
                    // 상세보기 버튼 찾기
                    const btn = item.querySelector('button.employee_btn');
                    if (btn) {
                        btn.click(); // [중요] 버튼 클릭!
                        return true;
                    }
                }
            }
            return false;
        });

        if (!found) {
            throw new Error("❌ '김남기' 교수님 섹션 또는 버튼을 찾을 수 없습니다. (debug_step1_load.html 확인 필요)");
        }

        console.log("🖱️ [3단계] 상세보기 버튼 클릭 완료. 데이터 로딩 대기...");

        // 논문 데이터가 로딩될 때까지 잠시 대기 (7초)
        await new Promise(r => setTimeout(r, 7000));

        // 2차 디버깅 파일 저장 (클릭 후)
        const content = await page.content();
        fs.writeFileSync('debug_step2_clicked.html', content);
        console.log("📸 [디버깅] 클릭 후 화면 저장 완료 (debug_step2_clicked.html)");

        // Cheerio로 파싱 시작
        const $ = cheerio.load(content);
        console.log("✅ [4단계] 데이터 파싱 시작.");

        // 클릭했으므로 active 클래스가 붙은 상태의 DOM을 파싱
        let targetSection = null;
        $('.employee_item').each((i, el) => {
            const name = $(el).find('.name_wrap .name').first().text().trim();
            if (name === '김남기') {
                targetSection = $(el);
                return false;
            }
        });

        if (!targetSection) throw new Error("섹션 재확인 실패");

        const detailLayer = targetSection.find('.detail_layer');

        for (const fileCfg of CONFIG.files) {
            const filePath = path.join(CONFIG.dataPath, fileCfg.name);
            const existingCount = getExistingDataCount(filePath);
            console.log(`🔄 [${fileCfg.name}] 기존 데이터 건수: ${existingCount}`);
            const newPubs = [];

            let targetBox = null;
            // 상세보기 클릭 후에는 .profile_tab_box 내용이 채워져 있어야 함
            detailLayer.find('.profile_tab_box').each((i, box) => {
                const headerText = $(box).find('h3.skip').text();
                // 탭 제목 매칭 (공백 제거 후 비교)
                if (headerText.replace(/\s/g, '').includes(fileCfg.headerKeyword.replace(/\s/g, ''))) {
                    targetBox = $(box);
                    return false;
                }
            });
            
            // 해당 섹션에서 논문/저서 리스트 추출
            if (targetBox) {
                targetBox.find('ul.num > li').each((i, li) => {
                    const $li = $(li);
                    $li.find('.count').remove();
                    const fullText = $li.text().trim();

                    const titleMatch = fullText.match(/「(.*?)」/);
                    const title = titleMatch ? titleMatch[1] : "";

                    const authorMatch = fullText.match(/^(.*?)「/);
                    const authors = authorMatch ? authorMatch[1].trim() : "";

                    const rest = fullText.split('」')[1] || "";
                    const yearMatch = rest.match(/(\d{4})\./);
                    const year = yearMatch ? yearMatch[1] : "";

                    let venue = "";
                    const parts = rest.split(',');
                    if (parts.length > 1) venue = parts[1].trim();
                    else venue = rest.trim();

                    if (title && year) {
                        newPubs.push({
                            id: newPubs.length + 1,
                            year: year,
                            type: fileCfg.type,
                            title: title,
                            authors: authors,
                            venue: venue,
                        });
                    }
                });
            }

            if (newPubs.length === 0) { // 데이터가 하나도 없는 경우
                console.warn(`⚠️ [${fileCfg.name}] 데이터 0건 (debug_step2_clicked.html 파일을 확인해보세요)`);
                continue;
            }

            // 기존보다 데이터가 적거나 같으면 업데이트 방지
            if (existingCount === newPubs.length) {
                console.log(`ℹ️ [${fileCfg.name}] 기존 데이터와 동일 (${existingCount}건). 업데이트 생략.`);
                continue;
            }

            if (existingCount > 0 && newPubs.length < existingCount) {
                console.error(`⛔ [${fileCfg.name}] 데이터 누락 의심으로 업데이트 중단 (기존: ${existingCount} -> 신규: ${newPubs.length})`);
                continue;
            }

            const fileContent = `const ${fileCfg.varName} = {\n    publications: ${JSON.stringify(newPubs, null, 4)}\n};\nexport default ${fileCfg.varName};`;
            fs.writeFileSync(filePath, fileContent, 'utf8');
            console.log(`✅ [성공] ${fileCfg.name} 업데이트 (${newPubs.length}건)`);
        }

    } catch (error) {
        // [선제적 에러 핸들링 추가] 타임스탬프를 부여한 전체 화면 캡처
        let errorImagePath = "캡처 실패";
        if (page && !page.isClosed()) {
            try {
                const timestamp = new Date().toISOString().replace(/[:T.]/g, '-').slice(0, 19);
                errorImagePath = path.join(__dirname, `../error_dump_${timestamp}.png`);
                await page.screenshot({ path: errorImagePath, fullPage: true });
            } catch (captureError) {
                console.error("📸 스크린샷 캡처 중 시스템 오류:", captureError.message);
            }
        }

        console.error("\n========================================");
        console.error("🚨 오류 발생:", error.message);
        console.error(`📸 [디버깅] 에러 시점의 전체 화면이 저장되었습니다: ${errorImagePath}`);
        console.error("💡 조치 사항: 캡처된 이미지를 확인하여 학교 서버 지연(빈 화면)인지, 사이트 개편(구조 변경)인지 파악하세요.");
        console.error("========================================\n");
        process.exit(1);
    } finally {
        if (browser) await browser.close();
    }
}

updatePublications();
// End of file