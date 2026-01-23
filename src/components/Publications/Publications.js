import React, { useMemo } from 'react';
import { SectionTitle } from '../../utils/constants';
// 논문 데이터 파일 (국제, 국내) & 저서는 제외
import int_pubData from '../../data/int_publicationsData';
import dm_pubData from '../../data/dm_publicationsData';

const Publications = () => {
  // 데이터를 병합하고 최신순 정렬 후 상위 5개 추출
  const recentPublications = useMemo(() => {
    // 1. 두 데이터 소스 병합
    const allPubs = [
      ...int_pubData.publications,
      ...dm_pubData.publications
    ];

    // 2. 연도 기준 내림차순 정렬 (최신순)
    // 데이터의 id가 발행 순서를 보장하지 않을 수 있으므로 year로 정렬(당장은 보장하는 듯함)
    const sortedPubs = allPubs.sort((a, b) => Number(b.year) - Number(a.year));

    // 3. 상위 5개만 자르기
    return sortedPubs.slice(0, 5);
  }, []);

  // 추출된 5개 데이터를 연도별로 그룹화
  const groupedPublications = useMemo(() => {
    if (!recentPublications || recentPublications.length === 0) return [];
    
    const grouped = {};
    recentPublications.forEach(paper => {
      if (!grouped[paper.year]) {
        grouped[paper.year] = [];
      }
      grouped[paper.year].push(paper);
    });
    
    // 연도 내림차순 정렬하여 배열로 변환
    return Object.keys(grouped)
      .sort((a, b) => b.localeCompare(a))
      .map(year => ({
        year,
        papers: grouped[year]
      }));
  }, [recentPublications]);

  return (
    <section id="publications" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle>연구 실적</SectionTitle>
        <div className="max-w-4xl mx-auto">
          {groupedPublications.length > 0 ? (
            <div className="space-y-8">
              {groupedPublications.map(({ year, papers }) => (
                <div key={year}>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">{year}년</h3>
                  <ul className="space-y-4">
                    {papers.map((paper) => (
                      <li key={paper.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{year}</span>
                          <span className="text-gray-400 text-xs">{paper.venue}</span>
                        </div>
                        <p className="font-bold text-gray-800 text-lg mb-1">{paper.title}</p>
                        <p className="text-gray-600 text-sm">{paper.authors}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">게재된 논문 정보를 불러오지 못했습니다...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;
