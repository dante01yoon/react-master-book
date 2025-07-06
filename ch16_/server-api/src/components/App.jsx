import React from 'react';
import { getLazyCall } from '../utils';

/**
 * 서버에서 받아온 목록을 렌더링하는 컴포넌트
 * @param {{list: Array<{id: number, title: string}>}} props
 */
export const HeavyListPage = ({ list }) => {
  // 클라이언트와 서버 양쪽에서 렌더링될 때 모두 호출됨
  console.log('[COMPONENT] HeavyListPage 렌더링, list:', list);
  return (
    <div>
      {/* list가 undefined나 null일 경우를 대비하여 빈 배열로 처리함 */}
      {(list ?? []).map((item) => <div key={item.id}>{item.title}</div>)}
    </div>
  );
};

// Next.js의 getServerSideProps를 모방한 데이터 페칭 함수를 static 속성으로 정의함
HeavyListPage.danteServerSideProps = () => {
  // 5초 후에 목록 데이터를 반환하는 비동기 함수
  return getLazyCall();
};

/**
 * 애플리케이션의 메인 컴포넌트
 * @param {{list: Array<{id: number, title: string}>}} props
 */
const App = ({ list }) => {
  console.log('[COMPONENT] App 렌더링, list:', list);
  return (
    <main>
      <div>
        React renderToString example
      </div>
      <div>
        <HeavyListPage list={list} />
      </div>
    </main>
  );
};

export default App; 