import React, { useEffect, useState, useLayoutEffect, Suspense } from "react";
import { fetchProfileData } from "../fakeApi";

// 초기 프로필 데이터를 비동기적으로 가져오기 함수 호출
const initialResource = fetchProfileData();

// React 17 환경에서 `Suspense` 컴포넌트의 비동기 데이터 로딩 처리 방식 예제
// `ProfileDetails`, `ProfileTimeline` 컴포넌트는 `fetchProfileData`의 `resource` prop으로 데이터 수신
// 데이터 미준비 시(프로미스 pending 상태) 컴포넌트는 'suspend' 상태가 됨
// `Suspense`는 자식 컴포넌트 suspend 시 데이터 로드 완료까지 `fallback` UI를 표시함
// React 17에서 suspend된 컴포넌트의 형제 컴포넌트 처리 방식 관찰이 중요함

// 프로필 페이지 컴포넌트
function ProfilePage() {
  // 프로필 데이터를 위한 상태 및 상태 설정 함수
  // fetchProfileData로부터 반환된 resource를 초기값 사용
  const [resource, setResource] = useState(initialResource);
  return (
    <>
      {/* 최상위 Suspense 컴포넌트: ProfileDetails가 로딩되는 동안 fallback UI 표시 */}
      <Suspense
        fallback={
          <>
            <h1>프로필 로딩 중...</h1>
          </>
        }
      >
        {/* ProfileDetails가 suspend되면, Sibling "one"은 React 17에서 마운트되고 이펙트 실행 */}
        <Sibling name="one" />
        {/* 프로필 상세 정보를 보여주는 컴포넌트, 데이터 로딩 시 suspend 가능 */}
        <ProfileDetails resource={resource} />
        {/* 중첩된 Suspense 컴포넌트: ProfileTimeline이 로딩되는 동안 fallback UI 표시 */}
        <Suspense fallback={<h1>게시물 로딩 중...</h1>}>
          {/* ProfileTimeline이 suspend되면, Sibling "two"는 React 17에서 마운트되고 이펙트 실행 */}
          <Sibling name="two" />
          {/* 프로필 타임라인(게시물 목록)을 보여주는 컴포넌트, 데이터 로딩 시 suspend 가능 */}
          <ProfileTimeline resource={resource} />
          {/* ProfileTimeline이 suspend되어도, Sibling "three"는 React 17에서 마운트되고 이펙트 실행 */}
          {/* 이는 ProfileTimeline과 같은 Suspense 경계 내에 위치 */}
          <Sibling name="three" />
        </Suspense>
        {/* ProfileDetails 또는 ProfileTimeline이 suspend되어도, Sibling "four"는 React 17에서 마운트되고 이펙트 실행 */}
        {/* 이는 최상위 Suspense 경계 내에 위치 */}
        <Sibling name="four" />
      </Suspense>
    </>
  );
}

// 형제 컴포넌트의 렌더링 및 이펙트 실행 순서를 확인용 컴포넌트
function Sibling({ name }) {
  // useLayoutEffect는 DOM 변경 후 동기 실행
  useLayoutEffect(() => {
    console.log("Layout effect Sibling", name); // 레이아웃 이펙트 실행 로그
    return () => {
      console.log("Layout cleanup Sibling", name); // 레이아웃 이펙트 정리 로그
    };
  }, [name]); // name prop이 변경될 때마다 이펙트 재실행

  // useEffect는 렌더링 이후 비동기 실행
  useEffect(() => {
    console.log("Effect Sibling", name); // 이펙트 실행 로그

    return () => {
      console.log("Cleanup Sibling", name); // 이펙트 정리 로그
    };
  }, [name]); // name prop이 변경될 때마다 이펙트 재실행

  console.log("Render sibling", name); // 렌더링 로그
  return <h1>Sibling: {name}</h1>; // 형제 컴포넌트의 이름 표시 UI
}

// 프로필 상세 정보를 담당 컴포넌트
function ProfileDetails({ resource }) {
  useLayoutEffect(() => {
    console.log("Layout effect ProfileDetails");
    return () => {
      console.log("Layout cleanup ProfileDetails");
    };
  });

  useEffect(() => {
    console.log("Effect ProfileDetails");
    return () => {
      console.log("Cleanup ProfileDetails");
    };
  });
  // resource.user.read()를 통해 사용자 데이터를 읽어옴. 데이터가 준비되지 않으면 Suspense에 의해 포착
  const user = resource.user.read();
  return <h1>{user.name}</h1>; // 사용자 이름 표시 UI
}

// 프로필 타임라인(게시물 목록)을 담당 컴포넌트
function ProfileTimeline({ resource }) {
  // resource.posts.read()를 통해 게시물 데이터를 읽어옴. 데이터가 준비되지 않으면 Suspense에 의해 포착
  const posts = resource.posts.read();
  useLayoutEffect(() => {
    console.log("Layout effect ProfileTimeline");
    return () => {
      console.log("Layout cleanup ProfileTimeline");
    };
  });

  useEffect(() => {
    console.log("Effect ProfileTimeline");
    return () => {
      console.log("Cleanup ProfileTimeline");
    };
  });

  return (
    <ul>
      {/* 게시물 목록을 순회하며 각 게시물을 리스트 아이템으로 렌더링 */}
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export default ProfilePage;
