import { Suspense, use, useState, useEffect } from "react";
import { getLazyCall } from "../lib/api";
import "./App.css";

const SuspensedHeavyListPage = ({ promise }) => {
  // 가장 가까운 Suspense의 fallback을 보여줌
  const list = use(promise);
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

/**
 * 일반적인 리스트 렌더링 컴포넌트
 * 서버로부터 받은 데이터를 직접 props로 받아 렌더링함
 */
export const HeavyListPage = ({ list }) => {
  return (
    <div>
      {(list ?? []).map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

// 서버 사이드에서 데이터를 미리 가져오기 위한 정적 메서드
// Next.js의 getServerSideProps와 유사한 패턴을 직접 구현한 형태
HeavyListPage.danteSeverSideProps = () => {
  return getLazyCall();
};

const App = ({ promise }) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  
  // 이 useEffect는 클라이언트에서 하이드레이션이 완료된 후 실행됨
  // 스트리밍이 진행되는 동안에도 클라이언트 인터랙션은 정상 동작하는 것을 보여줌
  useEffect(() => {
    console.log("React App Hydrated and Mounted");
  }, []);

  return (
    <main>
      <div>
        React renderToPipeableStream exmaple {count}
        <button onClick={handleClick}>Increment</button>
      </div>
      <div>
        {/* Suspense는 하위 컴포넌트의 데이터 로딩을 기다리는 동안 fallback UI를 보여줌 */}
        <Suspense fallback="Loading...">
          {/* 이 컴포넌트는 서버에서 렌더링이 시작되지만, promise가 resolve될 때까지 완료되지 않음 */}
          {/* 스트림을 통해 클라이언트로 전송되고, 데이터가 준비되면 하이드레이션됨 */}
          <SuspensedHeavyListPage promise={promise} />
        </Suspense>
      </div>
    </main>
  );
};

export default App; 