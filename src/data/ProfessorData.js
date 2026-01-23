// 교수님 데이터 기본 정리
const professorData = {
  "name": "김남기",
  "role": "교수 / SW안전보안전공 주임교수",
  "image": process.env.PUBLIC_URL + "/assets/pro_Kim-ver2.jpg",
  "contact": {
    "email": "ngkim@kyonggi.ac.kr",
    "phone": "031-249-9662",
    "location": "경기대학교 소프트웨어경영대학"
  },
  "education": [
    "서강대학교 전자계산학 공학사",
    "한국과학기술원 전자계산학 공학석사",
    "한국과학기술원 전자계산학 공학박사"
  ],
  "interests": [
    "인공지능(AI)",
    "사물인터넷(IoT)",
    "블록체인",
    "정보보안"
  ],
};

export default professorData;
