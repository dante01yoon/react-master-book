// ch16/react-19/src/fakeApiForUse.js

// 사용자 정보를 가져오는 비동기 함수
export function fetchUser() {
  console.log("fetch user..."); // 사용자 정보 요청 시작 로그
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("===== fetched user ====="); // 사용자 정보 응답 로그
      resolve({ name: "Ringo Starr" }); // 예시 사용자 이름 객체 반환
    }, 3000); // 3초 후 resolve되도록 지연 시뮬레이션
  });
}

// 게시물 목록을 가져오는 비동기 함수
export function fetchPosts() {
  console.log("fetch posts..."); // 게시물 목록 요청 시작 로그
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("===== fetched posts ====="); // 게시물 목록 응답 로그
      resolve([ // 예시 게시물 배열 반환
        { id: 0, text: "I get by with a little help from my friends" },
        { id: 1, text: "I'd like to be under the sea in an octupus's garden" },
        { id: 2, text: "You got that sand all over your feet" }
      ]);
    }, 6000); // 6초 후 resolve되도록 지연 시뮬레이션
  });
}

// "Render-as-you-fetch" 패턴을 위한 데이터 미리 로드 함수
// 사용자 정보와 게시물 정보를 가져오는 프로미스를 각각 생성하여 객체로 반환함
// 이 함수는 데이터 요청을 컴포넌트 렌더링 이전에 시작하는 역할을 함
export function preloadProfileData() {
  const userPromise = fetchUser();
  const postsPromise = fetchPosts();
  return {
    userPromise,  // 사용자 정보 프로미스
    postsPromise, // 게시물 목록 프로미스
  };
}