import { useState, useEffect } from "react";

// useAuthStore 커스텀 훅 정의 시작
function useAuthStore() {
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 사용자 정보 관리 (초기값은 null)
  const [user, setUser] = useState(null);

  // 로그인 함수 (예시: 사용자 이름과 이메일로 로그인)
  const login = (username, email) => {
    setIsLoggedIn(true);
    setUser({ username, email });
    console.log(`${username}님, 환영합니다!`);
  };

  // 로그아웃 함수
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    console.log('로그아웃 되었습니다.');
  };

  // 인증 관련 상태와 함수들을 반환함
  return { isLoggedIn, user, login, logout };
}
// useAuthStore 커스텀 훅 정의 끝

// useRouter 커스텀 훅 정의 시작
function useRouter() {
  // 현재 URL의 pathname을 상태로 관리
  const [pathname, setPathname] = useState(window.location.pathname);
  // 현재 URL의 쿼리 파라미터를 상태로 관리
  const [query, setQuery] = useState(
    Object.fromEntries(new URLSearchParams(window.location.search))
  );

  useEffect(() => {
    // URL 변경을 감지하는 이벤트 핸들러
    const handleRouteChange = () => {
      setPathname(window.location.pathname);
      setQuery(Object.fromEntries(new URLSearchParams(window.location.search)));
    };

    // popstate 이벤트는 브라우저의 뒤로/앞으로 가기 버튼 클릭 시 발생함
    window.addEventListener('popstate', handleRouteChange);
    // pushState, replaceState 호출 시 URL 변경을 감지하기 위해 커스텀 이벤트를 사용할 수도 있으나,
    // 여기서는 간단하게 popstate만 처리함

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // 페이지 이동 함수
  const push = (href) => {
    window.history.pushState({}, '', href);
    // pushState는 popstate 이벤트를 발생시키지 않으므로 수동으로 상태 업데이트
    setPathname(href.split('?')[0]);
    const searchParams = href.split('?')[1] || '';
    setQuery(Object.fromEntries(new URLSearchParams(searchParams)));
  };

  // 라우터 객체 반환
  return { pathname, query, push };
}
// useRouter 커스텀 훅 정의 끝

// ➊ 'use'로 시작하여 커스텀 훅임을 명시함
function useWindowSize() {
  // ➋ window의 크기를 저장하기 위한 state. 초기값으로 현재 window 크기를 설정함
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // ➌ 컴포넌트의 생명주기와 동기화하기 위한 Effect Hook
  useEffect(() => {
    // window 크기가 변경될 때 state를 업데이트하는 핸들러 함수
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 'resize' 이벤트에 대한 리스너를 등록함
    window.addEventListener('resize', handleResize);

    // 클린업(cleanup) 함수: 컴포넌트가 언마운트될 때 이벤트 리스너를 제거함
    return () => window.removeEventListener('resize', handleResize);
  }, []); // 의존성 배열이 비어있으므로, 이 effect는 마운트 시 한 번만 실행됨

  // ➍ 캡슐화된 상태(size)를 반환함. UI(JSX)는 반환하지 않음
  return size;
}

function WindowSizeViewer() {
  // ➎ 커스텀 훅을 호출하여 로직을 재사용하고 상태를 가져옴
  const { width, height } = useWindowSize();
  const router = useRouter(); // 의존서 추가 및 제거가 쉬움
  const auth = useAuthStore();

  return <div>Window size: {width}x{height}</div>;
}

export default WindowSizeViewer;