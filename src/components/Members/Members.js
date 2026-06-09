import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../utils/constants';
import students from '../../data/StudentsData'; // 대학원생 데이터
import professorData from '../../data/ProfessorData'; // 교수님 데이터
import graduatesData from '../../data/graduatesData'; // 졸업생 데이터

// 기존 대학원생 카드
const MemberCard = ({ name, image, interests, type }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
    <div className="relative w-32 h-32 mx-auto mb-4">
      <img
        src={image}
        alt={`${name} ${type}`}
        className="w-full h-full rounded-full object-cover border-4 border-blue-50"
        loading="lazy"
      />
      <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
        {type}
      </span>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
    <p className="text-gray-500 text-sm break-keep leading-relaxed px-2">{interests}</p>
  </div>
);

{/*// 졸업생 카드 컴포넌트
const GraduateCard = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-start mb-3">
        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">
          {data.year}년 졸업
        </span>
        <span className={`text-xs font-bold px-2 py-1 rounded ${data.degree === '박사' ? 'bg-purple-100 text-purple-700' :
          data.degree === '석사' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}>
          {data.degree}
        </span>
        <span className="inline-block p-3 bg-blue-600 text-white rounded-2xl shadow-blue-200 shadow-lg mb-4 group-hover:scale-110 transition-transform">
          {data.degree === '석사' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
          ) : data.degree === '학사' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          ) : ( // 박사
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>
          )}
        </span>
        {/*
        <span className={`text-xs font-bold px-2 py-1 rounded ${data.degree === '박사' ? 'bg-purple-100 text-purple-700' :
          data.degree === '석사' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}>
          {data.degree}
        </span>
        }
      </div>
      <h4 className="text-lg font-bold text-gray-800 mb-1">{data.name}</h4>
    </div>
    {/* 현재 상태 노트 영역 봉인 }
    <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
      <p className="text-sm text-gray-500 mb-1">Current Status</p>
      <p className="text-blue-600 font-bold text-md truncate" title={data.note}>
        {data.note}
      </p>
    </div>
    { 졸업생 상태 노트 영역 봉인 }
  </div>
);*/}

// [수정됨] 졸업생 카드 컴포넌트
const GraduateCard = ({ data }) => {
  // 학위별 색상 및 아이콘 설정
  const getDegreeStyle = (degree) => {
    switch (degree) {
      case '박사':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          border: 'group-hover:border-purple-200',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14v6" /></svg>
          )
        };
      case '석사':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'group-hover:border-blue-200',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
          )
        };
      default: // 학사 및 기타
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          border: 'group-hover:border-green-200',
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          )
        };
    }
  };

  const style = getDegreeStyle(data.degree);

  return (
    <div className={`group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center text-center ${style.border}`}>

      {/* 상단: 졸업년도 뱃지 */}
      <span className="mb-4 text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full tracking-wide">
        {data.year}년 졸업
      </span>

      {/* 중단: 학위 아이콘 (프로필 사진 대용) */}
      <div className={`mb-4 p-4 rounded-full ${style.bg} ${style.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
        {style.icon}
      </div>

      {/* 하단: 이름 및 학위 */}
      <div>
        <h4 className="text-lg font-bold text-gray-800 mb-1">{data.name}</h4>
        <p className={`text-sm font-semibold ${style.text}`}>
          {data.degree}
        </p>
      </div>
    </div>
  );
};

// 졸업생 슬라이더 컴포넌트
const GraduatesCarousel = ({ graduates }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; // 한 줄에 4명

  const nextSlide = () => {
    if (startIndex + itemsPerPage < graduates.length) {
      setStartIndex(prev => prev + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(prev => prev - itemsPerPage);
    }
  };

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + itemsPerPage >= graduates.length;

  // 현재 보여줄 데이터 슬라이싱
  const visibleGraduates = graduates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative px-4 md:px-12">
      {/* 네비게이션 버튼 (좌) */}
      <button
        onClick={prevSlide}
        disabled={isPrevDisabled}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition-all ${isPrevDisabled
          ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
          : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-100'
          }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[200px]">
        {visibleGraduates.map((grad) => (
          <div key={grad.id} className="animate-in fade-in slide-in-from-right-4 duration-500">
            <GraduateCard data={grad} />
          </div>
        ))}
        {/* 데이터가 부족할 때 빈 공간 채우기 (레이아웃 유지용, 선택 사항) */}
        {[...Array(itemsPerPage - visibleGraduates.length)].map((_, i) => (
          <div key={`empty-${i}`} className="hidden lg:block"></div>
        ))}
      </div>

      {/* 네비게이션 버튼 (우) */}
      <button
        onClick={nextSlide}
        disabled={isNextDisabled}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition-all ${isNextDisabled
          ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
          : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-100'
          }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 페이지 인디케이터 */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: Math.ceil(graduates.length / itemsPerPage) }).map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${Math.floor(startIndex / itemsPerPage) === idx
              ? 'w-8 bg-blue-600'
              : 'w-2 bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const Members = () => {
  const info = professorData; // 교수님 데이터

  return (
    <section id="members" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionTitle>구성원</SectionTitle>

        {/* --- 지도교수 섹션 --- */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-3">
            <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
            지도교수
            <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
          </h3>
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full border border-gray-100">
              <div className="md:w-1/3 relative group">
                <img
                  src={info.image}
                  alt={`${info.name} 교수`}
                  className="w-full h-full object-cover min-h-[300px] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/*<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>*/}
              </div>
              <div className="p-8 md:p-10 md:w-2/3 flex flex-col justify-center">
                <div className="mb-6">
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">{info.name}</h4>
                  <p className="text-blue-600 font-semibold text-lg">{info.role}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Education</h5>
                    <ul className="space-y-1">
                      {info.education.map((edu, i) => (
                        <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Contact</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-gray-600 group">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <span className="text-sm">{info.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 group">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <span className="text-sm">{info.contact.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 대학원생 섹션 --- */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-3">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            대학원생
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          </h3>
          {/* 학생이 적을 때 중앙 정렬을 위해 justify-center 사용 */}
          <div className="flex flex-wrap justify-center gap-8">
            {students.master.map(s => (
              <div key={s.id} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] max-w-sm">
                <MemberCard
                  name={s.name}
                  image={s.image}
                  interests={s.interests}
                  type={s.type}
                />
              </div>
            ))}
          </div>
          {students.master.length <= 1 && (
            <div className="text-center mt-10 p-8 bg-blue-50/50 rounded-lg max-w-2xl mx-auto">
              <p className="text-gray-600 text-sm">
                우리 연구실은 소수 정예로 운영되어 교수님의 밀착 지도를 받을 수 있습니다.<br />
                여러분의 합류를 기다립니다.
              </p>
            </div>
          )}
        </div>
        <div className="mb-5 mx-4 md:mx-12">
          <GraduatesCarousel graduates={graduatesData.graduates} />
        </div>

        {/* 전체 졸업생 보기 버튼 (중앙 정렬 & 디자인 개선) */}
        <div className="mt-20 flex justify-center">
          <Link
            to="/graduates"
            className="
                  group
                  inline-flex items-center gap-2
                  px-8 py-3
                  bg-white text-gray-600 font-bold
                  border border-gray-200 rounded-full
                  shadow-sm
                  transition-all duration-300
                  hover:text-blue-600 hover:border-blue-200 hover:shadow-md hover:-translate-y-1
                "
          >
            <span>졸업생 전체 보기</span>
            {/* 화살표 아이콘 (호버 시 오른쪽으로 이동) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Members;