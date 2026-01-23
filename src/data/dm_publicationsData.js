const publicationsData = {
    publications: [
    {
        "id": 1,
        "year": "2025",
        "type": "Domestic Journal",
        "title": "객체 탐지와 텍스트 융합 기반 멀티모달 인터랙티브 시스템",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(23권 7호)"
    },
    {
        "id": 2,
        "year": "2025",
        "type": "Domestic Journal",
        "title": "LSTM 기반의 시계열 분석을 통한 교통사고 자동 탐지",
        "authors": "김남기 외2명",
        "venue": "전기학회논문지(74권 7호)"
    },
    {
        "id": 3,
        "year": "2024",
        "type": "Domestic Journal",
        "title": "SDN에서 PEARL을 이용한 멀티캐스트 라우팅 트리 형성 기법",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회논문지(22권 2호)"
    },
    {
        "id": 4,
        "year": "2023",
        "type": "Domestic Journal",
        "title": "Graph Neural Network 기반 추천시스템 성능 향상을 위한 유저 행동 시간 기반 데이터 사용 방안 분석",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(21권 5호)"
    },
    {
        "id": 5,
        "year": "2022",
        "type": "Domestic Journal",
        "title": "의료 영상 시스템에서 다중 연쇄 U-Net 모델을 이용한 개선된 췌장 영역 분할 탐지",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(20권 5호)"
    },
    {
        "id": 6,
        "year": "2022",
        "type": "Domestic Journal",
        "title": "패킷 수집을 통한 인터넷 서비스 트래픽 패턴 분석",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회논문지(20권 1호)"
    },
    {
        "id": 7,
        "year": "2020",
        "type": "Domestic Journal",
        "title": "SDN에서 강화학습을 통한 효과적인 멀티캐스트 라우팅 트리 생성 방법",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(18권 10호)"
    },
    {
        "id": 8,
        "year": "2020",
        "type": "Domestic Journal",
        "title": "블록체인 기반 이동식 저장 장치 기록 관리 시스템",
        "authors": "김남기 외3명",
        "venue": "한국정보기술학회논문지(18권 7호)"
    },
    {
        "id": 9,
        "year": "2020",
        "type": "Domestic Journal",
        "title": "SDN에서 강화학습을 통한 멀티캐스트 트리 생성 기법 분석",
        "authors": "김남기 외2명",
        "venue": "한국통신학회논문지(45권 5호)"
    },
    {
        "id": 10,
        "year": "2019",
        "type": "Domestic Journal",
        "title": "3차원 가상도시 모델에서 높이맵을 이용한 CNN 기반의 그림자 탐지방법",
        "authors": "김남기 외4명",
        "venue": "인터넷정보학회논문지(20권 6호)"
    },
    {
        "id": 11,
        "year": "2019",
        "type": "Domestic Journal",
        "title": "ROI 추출을 위한 기계 학습 기반 영상 전처리 기법",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(17권 11호)"
    },
    {
        "id": 12,
        "year": "2019",
        "type": "Domestic Journal",
        "title": "GPR 영상에서 딥러닝 기반 CNN을 이용한 배관 위치 추정 연구",
        "authors": "김남기 외3명",
        "venue": "인터넷정보학회논문지(20권 4호)"
    },
    {
        "id": 13,
        "year": "2019",
        "type": "Domestic Journal",
        "title": "Faster R-CNN을 활용한 GPR 영상에서의 지하배관 위치추적 성능분석",
        "authors": "김남기 외1명",
        "venue": "융합정보논문지(9권 5호)"
    },
    {
        "id": 14,
        "year": "2018",
        "type": "Domestic Journal",
        "title": "Wasserstein Center 손실을 이용한 스케치 기반 3차원 물체 검색",
        "authors": "김남기 외2명",
        "venue": "인터넷정보학회논문지(19권 6호)"
    },
    {
        "id": 15,
        "year": "2018",
        "type": "Domestic Journal",
        "title": "배치 정규화와 CNN을 이용한 개선된 영상분류 방법",
        "authors": "김남기 외2명",
        "venue": "인터넷정보학회논문지(19권 3호)"
    },
    {
        "id": 16,
        "year": "2017",
        "type": "Domestic Journal",
        "title": "내장형 시스템 기반 체험형 게임의 설계 및 구현",
        "authors": "김남기 외3명",
        "venue": "인터넷정보학회논문지(18권 4호)"
    },
    {
        "id": 17,
        "year": "2017",
        "type": "Domestic Journal",
        "title": "유튜브 실시간 스트리밍 방식의 지연 시간 분석",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회논문지(15권 7호)"
    },
    {
        "id": 18,
        "year": "2016",
        "type": "Domestic Journal",
        "title": "전송 전력 조절 알고리즘 동작을 고려한 인체 센서 수명 분석",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(14권 7호)"
    },
    {
        "id": 19,
        "year": "2016",
        "type": "Domestic Journal",
        "title": "바디 센서 네트워크 환경에서 메모리 기반 전송 전력 조절 알고리즘",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(14권 6호)"
    },
    {
        "id": 20,
        "year": "2015",
        "type": "Domestic Journal",
        "title": "웨어러블 센서 시스템에서의 제어 패킷 전송 결정 기법",
        "authors": "김남기 외1명",
        "venue": "인터넷정보학회논문지(16권 5호)"
    },
    {
        "id": 21,
        "year": "2015",
        "type": "Domestic Journal",
        "title": "무선 인체 센서 네트워크 환경에서 에너지 효율을 높이기 위한 무손실 압축 기법",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(13권 7호)"
    },
    {
        "id": 22,
        "year": "2014",
        "type": "Domestic Journal",
        "title": "단말간 직접 통신 시스템에서 동기 신호 전파 알고리즘 검증을 위한 시뮬레이터 구현",
        "authors": "김남기",
        "venue": "한국정보기술학회논문지(12권 11호)"
    },
    {
        "id": 23,
        "year": "2014",
        "type": "Domestic Journal",
        "title": "에너지 효율을 위한 인체 센서 시스템의 전송 전력 조절 모델 분석",
        "authors": "김남기 외1명",
        "venue": "인터넷정보학회논문지(15권 4호)"
    },
    {
        "id": 24,
        "year": "2013",
        "type": "Domestic Journal",
        "title": "자가 전력 스마트 태그를 이용한 효율적인 위치 기반 서비스 기술",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회논문지(11권 6호)"
    },
    {
        "id": 25,
        "year": "2013",
        "type": "Domestic Journal",
        "title": "위치 기반 관광 정보 서비스 기술 동향",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회 하계종합학술대회 논문집"
    },
    {
        "id": 26,
        "year": "2013",
        "type": "Domestic Journal",
        "title": "ONVIF표준 카메라의 스트리밍을 위한 미디어 서비스 구현",
        "authors": "김남기 외1명",
        "venue": "JCCI 2013"
    },
    {
        "id": 27,
        "year": "2013",
        "type": "Domestic Journal",
        "title": "바디 센서 네트워크에 존재하는 다양한 채널 상태에 따른 에너지 효율적인 디바이스 전력 관리 기법",
        "authors": "김남기 외2명",
        "venue": "한국정보처리학회 춘계학술발표대회 논문집(20권 1호)"
    },
    {
        "id": 28,
        "year": "2013",
        "type": "Domestic Journal",
        "title": "전파와 초음파를 이용한 거리 측정을 위한 다중 접속 제어 기법",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회논문지(11권 1호)"
    },
    {
        "id": 29,
        "year": "2012",
        "type": "Domestic Journal",
        "title": "무선 바디 센서 시스템 환경에서 가속도 센서를 활용한 사람의 움직임 추정",
        "authors": "김남기 외2명",
        "venue": "CEIC2012"
    },
    {
        "id": 30,
        "year": "2012",
        "type": "Domestic Journal",
        "title": "네트워크 카메라에서 ONVIF 표준을 이용한 장치 관리 서비스 설계 및 구현",
        "authors": "김남기 외2명",
        "venue": "한국컴퓨터종합학술대회 논문집(39집 1권 A호)"
    },
    {
        "id": 31,
        "year": "2012",
        "type": "Domestic Journal",
        "title": "모델 체커를 이용한 바디 센서 시스템의 동적 알고리즘 검증",
        "authors": "김남기 외1명",
        "venue": "2012 한국컴퓨터종합학술대회 논문집(39집 1권 B호)"
    },
    {
        "id": 32,
        "year": "2012",
        "type": "Domestic Journal",
        "title": "모바일 싱크 노드를 지원하는 센서 네트워크 시스템에서 노드 관리를 위한 RSFS 파일 시스템",
        "authors": "김남기 외3명",
        "venue": "한국정보기술학회논문지(10권 6호)"
    },
    {
        "id": 33,
        "year": "2012",
        "type": "Domestic Journal",
        "title": "펨토셀과 매크로셀 혼합 시스템을 위한 효율적인 페이징 기법",
        "authors": "김남기",
        "venue": "한국정보기술학회논문지(10권 3호)"
    },
    {
        "id": 34,
        "year": "2012",
        "type": "Domestic Journal",
        "title": "정책기반 RFID 장치 관리 모델",
        "authors": "김남기 외1명",
        "venue": "인터넷정보학회논문지(13권 1호)"
    },
    {
        "id": 35,
        "year": "2012",
        "type": "Domestic Journal",
        "title": "WiFi 신호를 이용한 기점기반 위치 추정 연구",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회논문지(10권 01호)"
    },
    {
        "id": 36,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "다중 도메인간 정보 공유를 위한 아이디 연계 시스템 구현",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(9권 12호)"
    },
    {
        "id": 37,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "안테나 방향 따른 WiFi 신호 크기 특성 측정",
        "authors": "김남기 외2명",
        "venue": "통신학회 하계중합학술발표대회"
    },
    {
        "id": 38,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "무선 센서 네트워크에서 RF와 음파를 이용한 거리 측정 시스템의 설계 및 구현",
        "authors": "김남기 외2명",
        "venue": "한국정보기술학회논문지(9권 6호)"
    },
    {
        "id": 39,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "스마트 태그 구현을 위한 블루투스 수신 신호 크기 및 지연시간 분석",
        "authors": "김남기 외1명",
        "venue": "한국통신학회 하계종합학술대회"
    },
    {
        "id": 40,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "바디 센서 네트워크에서 전송 파워 전력에 따른 수신 신호 크기 측정",
        "authors": "김남기 외1명",
        "venue": "한국통신학회 하계중합학술발표대회"
    },
    {
        "id": 41,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "무선 분산 시스템 기반의 무선 통신 성능 측정",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회"
    },
    {
        "id": 42,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "4 대의 이동형 로봇을 활용한 센서 노드 위치확정 방법",
        "authors": "김남기 외1명",
        "venue": "한국통신학회논문지(36권 5호)"
    },
    {
        "id": 43,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "무선 센서 네트워크에서 위치 측정을 위한 로봇 이동 메커니즘 구현",
        "authors": "김남기",
        "venue": "한국정보기술학회논문지(9권 3호)"
    },
    {
        "id": 44,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "RFID 응용인터페이스 표준 기술",
        "authors": "김남기 외2명",
        "venue": "TTA Journal(134호)"
    },
    {
        "id": 45,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "RFID 기반 물류정보 공유를 위한 인증 모델",
        "authors": "김남기 외4명",
        "venue": "한국정보기술학회논문지(9권 3호)"
    },
    {
        "id": 46,
        "year": "2011",
        "type": "Domestic Journal",
        "title": "에너지 소비를 줄이기 위한 바디 센서 네트워크 연구",
        "authors": "김남기 외1명",
        "venue": "한국통신학회 동계종합학술대회(6B권 18호)"
    },
    {
        "id": 47,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "초음파를 활용한 다중 이동 로봇의 위치확정 방법 구현",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회논문지(8권 10호)"
    },
    {
        "id": 48,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "홈 오토메이션 시스템과 결합된 사용자 편의 센서 네트워크 시스템",
        "authors": "김남기 외2명",
        "venue": "2010년도 한국통신학회 하계종합학술발표회 논문집"
    },
    {
        "id": 49,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "초음파 전방향성 장치를 활용한 물체 추적 실험 및 분석",
        "authors": "김남기 외2명",
        "venue": "2010년도 한국통신학회 하계종합학술발표회 논문집"
    },
    {
        "id": 50,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "NCQ 스트리밍을 통한 차세대 스마트폰 멀티미디어 성능 개선",
        "authors": "김남기 외1명",
        "venue": "2010년도 한국정보기술학회 하계종합학술대회 논문집"
    },
    {
        "id": 51,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "센서 네트워크를 이용한 박물관 전시물의 빛의 세기 모니터링",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회 하계종합학술대회 논문집"
    },
    {
        "id": 52,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "MICAz의 전송전력에 따른 데이터 전송범위 측정 및 분석",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회 하계종합학술대회 논문집"
    },
    {
        "id": 53,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "모바일 환경에서 저용량 메모리 상주 프로그램을 통한 효율적인 어플리케이션 운영",
        "authors": "김남기 외1명",
        "venue": "한국통신학회 동계종합학술발표회 논문집"
    },
    {
        "id": 54,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "메쉬업을 이용한 통합 요리 사이트 설계 및 구현",
        "authors": "김남기 외2명",
        "venue": "2010년도 한국통신학회 동계종합학술발표회 논문집"
    },
    {
        "id": 55,
        "year": "2010",
        "type": "Domestic Journal",
        "title": "무선 센서 네트워크에서 두 노드간 거리값 비교분석",
        "authors": "김남기 외1명",
        "venue": "제5회 정보보증 워크 발표논문집"
    },
    {
        "id": 56,
        "year": "2009",
        "type": "Domestic Journal",
        "title": "TinyOS 기반의 무선 멀티 컨트롤러",
        "authors": "김남기 외1명",
        "venue": "한국정보처리학회 추계학술대회 논문집"
    },
    {
        "id": 57,
        "year": "2009",
        "type": "Domestic Journal",
        "title": "초음파 센서를 이용한 거리 측정 설계 및 분석",
        "authors": "김남기 외1명",
        "venue": "한국정보처리학회 추계학술대회 논문집"
    },
    {
        "id": 58,
        "year": "2009",
        "type": "Domestic Journal",
        "title": "화성행궁 미아위치추적 시스템에서의 로그 데이터 분석",
        "authors": "김남기 외1명",
        "venue": "한국정보처리학회 추계학술대회 논문집"
    },
    {
        "id": 59,
        "year": "2009",
        "type": "Domestic Journal",
        "title": "무선 센서 네트워크에서 초음파를 이용한 전방향 거리 측정",
        "authors": "김남기 외1명",
        "venue": "한국인터넷방송통신TV학회 논문지(9권 5호)"
    },
    {
        "id": 60,
        "year": "2009",
        "type": "Domestic Journal",
        "title": "IEEE 802.16e 무선 네트워크에서 효율적인 데이터 전송 제어를 위한 가번 CRC 기법",
        "authors": "김남기",
        "venue": "한국정보기술학회논문지(7권 3호)"
    },
    {
        "id": 61,
        "year": "2009",
        "type": "Domestic Journal",
        "title": "무선 네트워크에서 가변 크기의 에러 검출 코드 적용",
        "authors": "김남기",
        "venue": "2009 한국정보기술학회 하계학술대회 논문집"
    },
    {
        "id": 62,
        "year": "2009",
        "type": "Domestic Journal",
        "title": "무선 센서네트워크에서 침입 탐지 시스템",
        "authors": "김남기 외2명",
        "venue": "정보처리학회 춘계학술발표대회 논문집(16권 1호)"
    },
    {
        "id": 63,
        "year": "2008",
        "type": "Domestic Journal",
        "title": "모바일 애드 혹 네트워크에서 분산 해쉬 테이블 기반의 서비스 탐색 기법",
        "authors": "김남기 외3명",
        "venue": "정보과학회논문지(35권 1호)"
    },
    {
        "id": 64,
        "year": "2007",
        "type": "Domestic Journal",
        "title": "IP 및 AMC 기반 이동 통신 시스템에서 효율적인 핸드오버 알고리즘",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회 논문지(5권 4호)"
    },
    {
        "id": 65,
        "year": "2007",
        "type": "Domestic Journal",
        "title": "동적 부하 분산 시스템에서 효율적인 작업 크기 계산을 통한 성능 개선",
        "authors": "김남기 외1명",
        "venue": "한국정보처리학회 논문지 A(14-A권 6호)"
    },
    {
        "id": 66,
        "year": "2007",
        "type": "Domestic Journal",
        "title": "FH-OFDM 시스템 성능 개선을 위한 주파수 공유 채널 할당 기법",
        "authors": "김남기 외1명",
        "venue": "한국정보기술학회논문지(5권 3호)"
    }
]
};
export default publicationsData;