import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import professorData from "./data/ProfessorData";
import { labInfo } from "./utils/constants";
import "./App.css";

// 컴포넌트 지연 로딩
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Members = lazy(() => import("./components/Members/Members"));
const Publications = lazy(() => import("./components/Publications/Publications"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const GraduatesPage = lazy(() => import("./pages/GraduatesPage"));
const AlbumPage = lazy(() => import("./pages/AlbumPage"));
const PublicationsPage = lazy(() => import("./pages/PublicationsPage"));

// 이미지 경로 설정
const swLogo = "/assets/SW_logo.png"; // SW중심대학 로고
const mainBgImage = "/assets/main-bg.jpg"; // 메인 배경 이미지
const logoImage = "/assets/logo.png"; // 연구실 로고 이미지

// 해시 스크롤 감지 컴포넌트 (상세 페이지 -> 메인 이동 시 자동 스크롤)
const ScrollToHashElement = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 200); // 페이지 로딩 대기 시간
      }
    }
  }, [hash]);
  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 경로가 바뀔 때마다 즉시 스크롤을 맨 위(0, 0)로 이동
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 헤더 컴포넌트: z-index를 높여 배경에 가려지지 않게
const Header = ({ sections, activeSection, scrollToSection }) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    // z-50과 w-full을 추가하여 최상단에 고정되고 전체 너비를 차지하도록 설정
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* 좌측 로고 영역 */}
        <div className="flex items-center gap-4">
          <Link
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src={logoImage} alt="로고" className="h-10" />
          </Link>
          <div className="h-6 w-px bg-gray-300 mx-1"></div>
          <a
            href="https://swuniv.kyonggi.ac.kr/index" // SW중심대학 공식 웹사이트 링크
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-blue-900 p-1.5 rounded-md flex items-center justify-center">
              <img
                src={swLogo}
                alt="SW중심대학"
                className="h-6 w-auto object-contain"
              />
            </div>
          </a>
        </div>

        {/* 우측 메뉴 영역 */}
        <ul className="flex items-center">
          {/* App_third.js 내 Header 컴포넌트의 메뉴 생성 로직 */}
          {sections.map((section, index) => (
            <li key={section.id} className="flex items-center h-full">
              {/* 1. 하위 메뉴의 기준점이 될 영역 (구분선을 제외한 순수 메뉴 영역) */}
              <div className="relative group flex flex-col items-center h-full">
                <Link
                  to={section.subMenus || !section.isExternal ? (isMainPage ? `#${section.id}` : `/#${section.id}`) : `/${section.id}`}
                  onClick={(e) => !section.isExternal && isMainPage && scrollToSection(e, section.id)}
                  className={`flex items-center text-gray-600 hover:text-blue-600 transition-colors px-2 h-10 ${
                    activeSection === section.id && isMainPage ? "font-bold border-b-2 border-blue-600" : ""
                  }`}
                >
                  {section.title}
                  {section.subMenus && (
                    <span className="ml-1.5 text-[8px] transition-transform duration-300 group-hover:rotate-180">▼</span>
                  )}
                </Link>

                {/* 2. 하위 메뉴판: w-full을 통해 상위 메뉴 너비를 넘지 않게 설정 */}
                {section.subMenus && (
                  //App_third.js 내 Header 컴포넌트 수정
                  <ul className="absolute top-full left-1/2 -translate-x-1/2 w-[125px] bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl rounded-xl py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-200 z-[60]">
                    {/* 마우스 이탈 방지 브릿지 */}
                    <div className="absolute -top-2 left-0 w-full h-2"></div>
                    {section.subMenus.map((sub, subIndex) => (
                      <React.Fragment key={sub.title}>
                        <li>
                          <Link
                            to={`/${sub.id}`}
                            className="block px-4 py-3 text-[14px] text-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap"
                          >
                            {sub.title}
                          </Link>
                        </li>
                        {/* 마지막 항목이 아닐 경우에만 가로 구분선 추가 */}
                        {subIndex < section.subMenus.length - 1 && (
                          <li className="h-px bg-gray-300 mx-4 my-1"></li>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                )}
              </div>
              {/* 3. 구분선: relative 그룹 외부에 두어 하위 메뉴 위치에 영향을 주지 않음 */}
              {index < sections.length - 1 && (
                <div className="h-3 w-px bg-gray-300 mx-4"></div>
              )}
            </li>
        ))}
        </ul>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-6 text-center text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} {labInfo.name}. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default function App() {
  const sections = [
  { id: "about", title: "연구실 소개" },
  { 
    id: "members", 
    title: "구성원", 
    subMenus: [
      { id: "graduates", title: "졸업생", isExternal: true },
    ] 
  },
  { 
    id: "publications", 
    title: "연구 실적", 
    subMenus: [
      { id: "publications", title: "연구 전체 목록", isExternal: true },
    ] 
  },
  { id: "album", title: "앨범", isExternal: true },
  { id: "contact", title: "오시는 길" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="bg-white font-sans text-gray-900">
        {/* 모든 페이지 이동 시 상단 이동을 보장하는 컴포넌트 */}
        <ScrollToTop />
        <ScrollToHashElement />
        <Header
          sections={sections}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />
        <Routes>
          <Route
            path="/"
            element={
              <main className="pt-16">
                {" "}
                {/* 헤더 높이만큼 여백 확보 */}
                <Home mainBgImage={mainBgImage} />
                <Suspense
                  fallback={<div className="py-20 text-center">로딩 중...</div>}
                >
                  <About />
                  <Members professorData={professorData} />

                  {/* 구성원 항목 아래 졸업생/앨범 버튼 섹션 */}
                  <section className="py-24 bg-blue-50 border-y border-blue-100">
                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                      <Link
                        to="/graduates"
                        className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center"
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          졸업생 소식
                        </h3>
                        <p className="text-gray-600 mb-6">
                          연구실의 발자취를 남긴 선배들을 만나보세요.
                        </p>
                        <span className="text-blue-600 font-bold">
                          전체 보기 →
                        </span>
                      </Link>
                      <Link
                        to="/album"
                        className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center"
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          활동 갤러리
                        </h3>
                        <p className="text-gray-600 mb-6">
                          연구실의 생생한 활동 현장을 확인하세요.
                        </p>
                        <span className="text-blue-600 font-bold">
                          앨범 열기 →
                        </span>
                      </Link>
                    </div>
                  </section>

                  <Publications publications/>
                  {/* 연구 실적 전체 보기 링크 섹션 */}
                  <section className="pb-24 bg-white">
                    <div className="container mx-auto px-6 text-center">
                      <Link
                        to="/publications"
                        className="inline-flex items-center px-10 py-4 bg-white text-blue-600 font-bold rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 shadow-lg"
                      >
                        발행물 전체 보기 →
                      </Link>
                    </div>
                  </section>
                  <Contact />
                </Suspense>
              </main>
            }
          />
          <Route
            path="/graduates"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <GraduatesPage />
              </Suspense>
            }
          />
          <Route
            path="/album"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AlbumPage />
              </Suspense>
            }
          />
          <Route
            path="/publications"
            element={
              <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                <PublicationsPage />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// End of file