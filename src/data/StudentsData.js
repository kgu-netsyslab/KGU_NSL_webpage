// 대학원생 데이터
const students = {
  master: [
    {
      id: 1,
      name: "곽윤석",
      image: process.env.PUBLIC_URL + "/assets/members/Master's_level_kwak.jpg",
      interests: "Data scientist, Deep learning",
      type: "석사과정",
    },
    /*{ 예비 마킹 
            id: 2, 
            name: "김민규", 
            image: process.env.PUBLIC_URL + "/assets/Master's_level_Kim.jpg",
            interests: "인공지능, 머신러닝", 
            type: "석사과정",
        }*/
    {
      id: 2,
      name: "박태경",
      image:
        process.env.PUBLIC_URL + "/assets/members/Undergraduate_level_Park.jpg",
      interests: "Fine-tuning, Vision-Language Learning",
      type: "학부연구생",
    },
    {
      id: 3,
      name: "김지우",
      image: "https://placehold.co/256x256/EFEFEF/AAAAAA?text=Kim+Jiwoo",
      //process.env.PUBLIC_URL + "/assets/members/Undergraduate_level_Kim.png",
      interests: "Deep learning, Object Detection",
      type: "학부연구생",
    },
    /*{
      id: 4,
      name: "김민재",
      image: "https://placehold.co/256x256/EFEFEF/AAAAAA?text=Kim+Minjae",
      interests: "Deep learning, Object Detection",
      type: "학부연구생",
    },*/
  ],
};

export default students;
