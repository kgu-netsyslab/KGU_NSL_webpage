import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import labData from '../data/graduatesData';

const GraduatesPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 이름 검색용
  const [selectedYear, setSelectedYear] = useState('All'); // 연도 선택용

  // 검색 및 필터링 적용
  const filteredGrads = useMemo(() => {
    return labData.graduates.filter(grad => {
      const matchName = grad.name.includes(searchTerm);
      const matchYear = selectedYear === 'All' || grad.year === selectedYear;
      return matchName && matchYear;
    });
  }, [searchTerm, selectedYear]);

  // 연도별 그룹화 (내림차순 정렬)
  const groupedGrads = useMemo(() => {
    const groups = filteredGrads.reduce((acc, grad) => {
      if (!acc[grad.year]) acc[grad.year] = [];
      acc[grad.year].push(grad);
      return acc;
    }, {});
    return Object.keys(groups).sort((a, b) => b - a).map(year => ({ year, members: groups[year] }));
  }, [filteredGrads]);

  return (
    <div className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-6">
        {/* 헤더 섹션 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Link to="/" className="inline-flex items-center text-blue-600 font-medium mb-6 hover:translate-x-1 transition-transform">
            ← 메인으로 돌아가기
          </Link>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Hall of Fame</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Smart IoT 연구실의 혁신을 이끌어온 자랑스러운 졸업생들입니다.<br />
            다양한 산업 현장과 학계에서 연구실의 가치를 빛내고 있습니다.
          </p>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16 max-w-2xl mx-auto">
          <input
            type="text" placeholder="이름 검색..."
            className="px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none flex-1"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-6 py-3 rounded-full border border-gray-200 outline-none bg-white"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">전체 연도</option>
            {Array.from(new Set(labData.graduates.map(g => g.year))).sort((a, b) => b - a).map(y => (
              <option key={y} value={y}>{y}년</option>
            ))}
          </select>
        </div>

        {/* 졸업생 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredGrads.map((grad) => (
            <div key={grad.id} className="group relative bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2">
              {/* 상단 장식 요소 */}
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                  {grad.year}년 졸업
                </div>
              </div>

              {/* 과정 정보 */}
              <div className="mb-4">
                <span className="inline-block p-3 bg-blue-600 text-white rounded-2xl shadow-blue-200 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  {grad.degree === '석사' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  )}
                </span>
                <h3 className="text-2xl font-bold text-gray-800">{grad.name}</h3>
                <p className="text-blue-500 font-medium">{grad.degree} 과정 졸업</p>
              </div>

              {/* 현직/진로 영역 */}
              <div className="mt-6 pt-6 border-t border-gray-50">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Current Career</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  <p className="text-gray-800 text-sm font-semibold">{grad.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraduatesPage;
