import React, { useState, useEffect, Suspense, lazy } from "react";
import { labInfo } from "../../utils/constants";

const RippleShaderBackground = lazy(() => import("./RippleShaderBackground")); // 배경 컴포넌트 지연 로드

const Home = ({ mainBgImage }) => {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow3D(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {show3D ? (
        <Suspense
          fallback={
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url(${mainBgImage})` }}
            />
          }
        >
          <RippleShaderBackground imageUrl={mainBgImage} />
        </Suspense>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${mainBgImage})` }}
        />
      )}

      {/* 텍스트 영역: 배경보다 위에 보이도록 z-10 설정 */}
      <div className="relative z-10 text-center px-4 pointer-events-none">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          {labInfo.affiliation}
          <br />
          <span className="text-blue-400">{labInfo.nameKorean}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-md">
          IoT를 넘어 AI, LLM, 게임 개발까지,
          <br />
          당신의 아이디어를 현실로 만드는 곳.
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all transform hover:scale-105 duration-300 shadow-xl border border-blue-400 pointer-events-auto"
        >
          연구실 둘러보기
        </button>
      </div>
    </section>
  );
};

export default Home;
