import React, { use, Suspense } from 'react';

// 프로미스들을 담는 resource 객체의 타입 정의
interface ProfileResource {
  userPromise: Promise<{ name: string }>;
  postsPromise: Promise<{ id: number; text: string }[]>;
}

// 사용자 상세 정보를 표시하는 컴포넌트
// userPromise를 프롭스로 받음
function ProfileDetails({ userPromise }: { userPromise: ProfileResource['userPromise'] }) {
  // use() API를 사용하여 전달받은 사용자 정보 프로미스를 읽음
  const user = use(userPromise);
  return <h1>{user.name}</h1>; // 사용자 이름 표시
}

// 사용자 게시물 목록을 표시하는 컴포넌트
// postsPromise를 프롭스로 받음
function ProfilePosts({ postsPromise }: { postsPromise: ProfileResource['postsPromise'] }) {
  // use() API를 사용하여 전달받은 게시물 목록 프로미스를 읽음
  const posts = use(postsPromise);
  return (
    <ul>
      {/* 게시물 배열을 순회하며 각 게시물의 내용을 리스트 아이템으로 표시함 */}
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

// 프로필 페이지 전체를 구성하는 메인 컴포넌트
// resource 객체를 프롭스로 받음
export default function ProfilePageWithUse({ resource }: { resource: ProfileResource }) {
  return (
    // 최상위 Suspense: ProfileDetails 또는 ProfilePosts 내부에서 데이터 로딩 중일 때 fallback을 표시함
    <Suspense fallback={<h2>페이지 로딩 중...</h2>}>
      {/* userPromise를 ProfileDetails 컴포넌트에 프롭스로 전달함 */}
      <ProfileDetails userPromise={resource.userPromise} />
      {/* 중첩된 Suspense: ProfilePosts 데이터만 로딩 중일 때 fallback을 표시함 */}
      <Suspense fallback={<p>게시물 로딩 중...</p>}>
        {/* postsPromise를 ProfilePosts 컴포넌트에 프롭스로 전달함 */}
        <ProfilePosts postsPromise={resource.postsPromise} />
      </Suspense>
    </Suspense>
  );
}