const albumData = {
    // 앨범 데이터 (연도별 그룹화)
    // 배열은 최신부터, id는 과거부터
    // type: "image" | "video" | "" (빈 문자열은 이미지로 간주)
    // Thumbnail로 썸네일 기본 설정 & 비울 경우 videoUrl의 첫 장면으로 썸네일 자동 생성
    album: [
        {
            year: "2025",
            events: [
                { id: 11, type: "", title: "국제 학술대회 참가", date: "2025.12", image: process.env.PUBLIC_URL + "/assets/album_IMGS/정글.jpeg", participants: "박태경, 곽윤석" },
                { id: 10, type: "image", title: "캡스톤 디자인 경진대회", date: "2025.05", image: process.env.PUBLIC_URL + "/assets/album_IMGS/캡스톤.jpg", participants: "이수민, 장예진, 김도현, 최민서" },
                { id: 9, type: "image", title: "SW중심대학 페스티벌", date: "2025.10", image: process.env.PUBLIC_URL + "/assets/album_IMGS/sw페스티벌.jpg", participants: "김민재, 오지현, 한지훈" },
                { id: 8, type: "image", title: "졸업생 환송회", date: "2025.12", image: process.env.PUBLIC_URL + "/assets/album_IMGS/정글.jpg", participants: "전체 연구실 구성원" },
                { id: 7, type: "video", title: "연구실 MT", date: "2025.03", videoUrl: process.env.PUBLIC_URL + "/assets/album_IMGS/트린용스틸.webm", Thumbnail: "", participants: "전체 연구실 구성원" },
            ]
        },
        {
            year: "2024",
            events: [
                { id: 6, title: "국내 학술대회 참가", date: "2024.11", image: "https://placehold.co/600x400?text=Conference" },
            ]
        },
        {
            year: "2023",
            events: [
                { id: 5, title: "졸업생 환송회", date: "2023.12", image: "https://placehold.co/600x400?text=Farewell+Party" },
                { id: 4, title: "SW중심대학 페스티벌", date: "2023.10", image: "https://placehold.co/600x400?text=Festival" },
                { id: 3, title: "하계 워크숍", date: "2023.07", image: "https://placehold.co/600x400?text=Workshop" },
            ]
        },
        {
            year: "2022",
            events: [
                { id: 2, title: "국제 학술대회 참가", date: "2022.12", image: "https://placehold.co/600x400?text=International+Conference" },
                { id: 1, title: "캡스톤 디자인 경진대회", date: "2022.05", image: "https://placehold.co/600x400?text=Capstone+Design" },
            ]
        },
    ]
};
export default albumData;
