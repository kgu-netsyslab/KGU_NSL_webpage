// 공통 상수 및 데이터
export const labInfo = {
  name: "NS Lab",
  nameKorean: "네트워크 시스템 연구실",
  affiliation: "경기대학교 소프트웨어경영대학",
  description: "IoT 기술을 기반으로 AI, LLM, 게임 개발 등 차세대 소프트웨어 기술을 탐구하고, 창의적인 아이디어를 현실로 구현하는 연구실입니다. 우리는 이론과 실제를 넘나들며 미래 기술을 선도할 인재를 양성합니다.",
  contact: {
    address: "경기도 수원시 영통구 광교산로 154-42 경기대학교 8강의동 8506호",
    email: "ngkim@kyonggi.ac.kr",
    phone: "031-249-9662",
  },
};
// 섹션 제목 컴포넌트
export const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{children}</h2>
);
