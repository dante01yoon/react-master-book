// 사용자 프로필 데이터를 가져오는 함수
// 사용자 정보와 게시물 정보를 동시에 요청하고, 각각의 Promise를 반환함
export function fetchProfileData() {
  let userPromise = fetchUser(); // 사용자 정보 가져오기 Promise
  let postsPromise = fetchPosts(); // 게시물 목록 가져오기 Promise
  return {
    user: wrapPromise(userPromise), // 사용자 정보 Promise를 래핑하여 Suspense와 함께 사용 가능하도록 함
    posts: wrapPromise(postsPromise) // 게시물 정보 Promise를 래핑함
  };
}

// Suspense와 통합하기 위한 Promise 래퍼 함수
// Relay와 같은 Suspense 통합 라이브러리는 React와 통합하기 위해 이와 유사한 계약을 구현함.
// 실제 구현은 훨씬 더 복잡할 수 있으므로, 이 코드를 프로젝트에 그대로 복사하여 사용하지 않도록 주의해야 함.
function wrapPromise(promise) {
  let status = "pending"; // 현재 Promise의 상태 (pending, success, error)
  let result; // Promise가 성공했을 때의 결과값 또는 실패했을 때의 에러 객체
  // Promise가 완료되면 상태와 결과를 업데이트하는 서스펜더
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    // 데이터를 읽는 함수
    // 상태에 따라 데이터를 반환하거나, Suspense를 트리거하는 예외를 발생시킴
    read() {
      if (status === "pending") {
        throw suspender; // 데이터가 아직 준비되지 않았으면 Suspense에 알림
      } else if (status === "error") {
        throw result; // 에러가 발생했으면 에러를 던짐
      } else if (status === "success") {
        return result; // 데이터가 준비되었으면 결과를 반환함
      }
    }
  };
}

// 사용자 정보를 가져오는 비동기 함수 (3초 지연 시뮬레이션)
function fetchUser() {
  console.log("fetch user...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("===== fetched user =====");
      resolve({
        name: "Ringo Starr" // 예시 사용자 이름
      });
    }, 3000); // 3초 후 resolve
  });
}

// 예시 게시물 데이터 배열
let ringoPosts = [
  {
    id: 0,
    text: "I get by with a little help from my friends"
  },
  {
    id: 1,
    text: "I'd like to be under the sea in an octupus's garden"
  },
  {
    id: 2,
    text: "You got that sand all over your feet"
  }
];

// 게시물 목록을 가져오는 비동기 함수 (2초 지연 시뮬레이션)
function fetchPosts() {
  // 함수 호출 시점의 게시물 목록을 복사하여 사용 (데이터 불변성 유지 목적은 아님)
  let ringoPostsAtTheTime = ringoPosts;
  console.log("fetch posts...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("===== fetched posts =====");
      resolve(ringoPostsAtTheTime); // 예시 게시물 목록 resolve
    }, 2000); // 2초 후 resolve
  });
}
