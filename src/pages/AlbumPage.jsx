import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import labData from '../data/albumData';

const AlbumPage = () => {
  const [selectedImg, setSelectedImg] = useState(null); // 라이트박스용
  const [filterYear, setFilterYear] = useState('All'); // 필터용
  const [viewingData, setViewingData] = useState({ groupIdx: null, eventIdx: null }); // 상세보기용
  const [yearIndicator, setYearIndicator] = useState(null); // 연도 인디케이터용
  const currentEvent = viewingData.groupIdx !== null //데이터 종류 확인용
    ? labData.album.filter(g => filterYear === 'All' || g.year === filterYear)[viewingData.groupIdx].events[viewingData.eventIdx]
    : null;

  // 라이트박스 오픈 시 바디 스크롤 방지
  useEffect(() => {
    if (viewingData.groupIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [viewingData.groupIdx]);

  // 이미지/비디오 내비게이션 함수
  const navigateImage = (direction) => {
    const { groupIdx, eventIdx } = viewingData;
    const filteredGroups = labData.album.filter(g => filterYear === 'All' || g.year === filterYear);
    const currentGroup = filteredGroups[groupIdx];

    if (direction === 'next') {
      if (eventIdx < currentGroup.events.length - 1) {
        setViewingData({ ...viewingData, eventIdx: eventIdx + 1 });
      } else if (groupIdx < filteredGroups.length - 1) {
        // 이전 연도로 이동 (과거로 이동: 위에서 아래로)
        const nextYear = filteredGroups[groupIdx + 1].year;
        setYearIndicator({ year: nextYear, dir: 'down' });
        setViewingData({ groupIdx: groupIdx + 1, eventIdx: 0 });
        setTimeout(() => setYearIndicator(null), 1200);
      } else {
        triggerShake();
      }
    } else if (direction === 'prev') {
      if (eventIdx > 0) {
        setViewingData({ ...viewingData, eventIdx: eventIdx - 1 });
      } else if (groupIdx > 0) {
        // 다음 연도로 이동 (최신으로 이동: 아래에서 위로)
        const prevYear = filteredGroups[groupIdx - 1].year;
        setYearIndicator({ year: prevYear, dir: 'up' });
        setViewingData({ groupIdx: groupIdx - 1, eventIdx: filteredGroups[groupIdx - 1].events.length - 1 });
        setTimeout(() => setYearIndicator(null), 1200);
      } else {
        triggerShake();
      }
    }
  };

  const triggerShake = () => {
    const el = document.getElementById('lightbox-content');
    if (el) {
      el.classList.add('animate-shake');
      setTimeout(() => el.classList.remove('animate-shake'), 400);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        {/* 헤더 섹션 */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <Link to="/" className="inline-flex items-center text-blue-600 font-medium mb-4 hover:translate-x-1 transition-transform">
              ← 메인으로 돌아가기
            </Link>
            <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Activity Archive</h2>
            <p className="text-gray-500 text-lg">연구실의 도전과 열정, 그리고 소중한 순간들을 기록합니다.</p>
          </div>
          <div className="hidden md:block">
            <span className="text-6xl font-black text-gray-100 uppercase select-none">Gallery</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* 왼쪽: 메인 앨범 리스트 */}
          <div className="flex-1">
            {labData.album
              .filter(group => filterYear === 'All' || group.year === filterYear)
              .map((yearGroup, groupIdx) => (
                <div key={yearGroup.year} id={`year-${yearGroup.year}`} className="mb-20">
                  {/* 연도 표시 및 라인 */}
                  <div className="flex items-center mb-10">
                    <div className="bg-gray-900 text-white px-6 py-2 rounded-full text-2xl font-black shadow-xl mr-6">
                      {yearGroup.year}
                    </div>
                    <div className="h-0.5 bg-gradient-to-r from-gray-200 to-transparent flex-1"></div>
                  </div>
                  {/* 사진 그리드 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {yearGroup.events.map((event, eventIdx) => (
                      <div key={event.id}
                        className="group relative h-80 overflow-hidden rounded-[2.5rem] shadow-2xl bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedImg(event.image || event.videoUrl); // 이미지 없으면 비디오 전달
                          setViewingData({ groupIdx, eventIdx });
                        }}
                      >
                        {/* 비디오 썸네일 설정 로직 & 없으면 자동 생성 */}
                        {event.type === 'video' && !event.Thumbnail ? (
                          <video
                            src={`${event.videoUrl}#t=0.1`} // 0.1초 지점의 프레임을 썸네일로 사용
                            className="w-full h-full object-cover"
                            preload="metadata"
                            muted
                          />
                        ) : (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                        )}

                        {/* 1 & 2. 썸네일 표시 및 중앙 재생 버튼 (동영상인 경우) */}
                        {event.type === 'video' && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center">
                            {/* 재생 버튼 아이콘 (반투명 서클과 삼각형) */}
                            <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300">
                              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                            </div>
                          </div>
                        )}

                        {/* 정보 오버레이 (Glassmorphism) */}
                        <div className="absolute inset-x-4 bottom-4 p-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <p className="text-blue-200 text-xs font-bold mb-1">{event.date}</p>
                          <h4 className="text-white text-xl font-bold">{event.title}</h4>
                          <div className="mt-3 w-8 h-1 bg-blue-400 rounded-full"></div>
                        </div>
                        {/* 기본 제목 (보였다가 호버시 사라짐) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 group-hover:opacity-0 transition-opacity">
                          <h4 className="text-white text-xl font-bold">{event.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
          </div>
          {/* 라이트박스 UI */}
          {yearIndicator && (
            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-white pointer-events-none z-[105] select-none ${yearIndicator.dir === 'up' ? 'year-silhouette-up' : 'year-silhouette-down'}`}>
              {yearIndicator.year}
            </div>
          )}
          {selectedImg && (
            <div
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => {
                setSelectedImg(null);
                setViewingData({ groupIdx: null, eventIdx: null });
              }}
            >
              <img src={selectedImg} className="max-w-full max-h-full rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" alt="확대 보기" />
              <button className="absolute top-10 right-10 text-white text-4xl">&times;</button>
              {viewingData.groupIdx !== null && (
                <div
                  className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                  onClick={() => setViewingData({ groupIdx: null, eventIdx: null })}
                  onWheel={(e) => {
                    if (e.deltaY > 0) navigateImage('next');
                    else navigateImage('prev');
                  }}
                >
                  {/* 좌우 화살표 */}
                  <button onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }} className="absolute left-8 text-white/50 hover:text-white text-6xl transition-colors z-[110]">
                    ‹<span className="text-sm font-bold text-white/70 mt-[-10px]"> 이전</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); navigateImage('next'); }} className="absolute right-8 text-white/50 hover:text-white text-6xl transition-colors z-[110]">
                    <span className="text-sm font-bold text-white/70 mt-[-10px]">다음 </span>›
                  </button>
                  <div id="lightbox-content" className="relative group max-w-5xl max-h-[100vh] transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
                    {/* 이미지 또는 비디오 타입에 따라 다르게 렌더링 */}
                    {(() => {
                      const currentEvent = labData.album.filter(g => filterYear === 'All' || g.year === filterYear)[viewingData.groupIdx].events[viewingData.eventIdx];
                      if (currentEvent.type === 'video') {
                        return (
                          <video
                            src={currentEvent.videoUrl}
                            poster={currentEvent.Thumbnail} // 썸네일 이미지를 포스터로 사용
                            controls
                            className="w-full max-h-[70vh] rounded-t-lg shadow-2xl"
                            autoPlay
                          />
                        );
                      } else {
                        return (
                          <img
                            src={currentEvent.image}
                            className="w-full h-full object-contain rounded-lg shadow-2xl max-h-[70vh]"
                            alt="확대 이미지"
                          />
                        );
                      }
                    })()}
                    {/* 하단 정보 바 (마우스 호버 시 노출) */}
                    <div className={`bg-black/70 backdrop-blur-md p-6 rounded-b-lg transition-transform duration-300 ${currentEvent.type === 'video'
                      ? 'translate-y-0 relative w-full' // 동영상: 고정 위치, 100% 너비
                      : 'absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0' // 이미지: 호버 로직 유지
                      }
                    `}>
                      <h4 className="text-white text-xl font-bold mb-1">{currentEvent.title}</h4>
                      <div className="flex gap-4 text-sm text-gray-300">
                        <span>📅 {currentEvent.date}</span>
                        <span>👥 {currentEvent.participants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 오른쪽: 연도별 필터 사이드바 (여백 활용) */}
          <aside className="lg:w-8 sticky top-32 h-fit">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Years</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setFilterYear('All')}
                  className={`text-sm font-bold ${filterYear === 'All' ? 'text-blue-600' : 'text-gray-400'}`}>ALL</button>
              </li>
              {labData.album.map(group => (
                <li key={group.year}>
                  <button onClick={() => setFilterYear(group.year)}
                    className={`text-sm font-bold ${filterYear === group.year ? 'text-blue-600' : 'text-gray-400'}`}>
                    {group.year}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
