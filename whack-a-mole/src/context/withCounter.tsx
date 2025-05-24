import React from "react";
import { useContext } from "react";

// ➊ 컴포넌트를 래핑하는 고차 컴포넌트
const withCounter =(HeavyComponent: React.ComponentType<any>) => {
  // ➋ 메모이제이션 적용
  const HeavyComponentMemo = React.memo(HeavyComponent)
  return (props: any) => {
    // ➌ 컨텍스트에서 카운트 값을 가져옴
    const { count } = useContext(CounterContext);
    return <HeavyComponentMemo {...props} count={count} />;
  };
 };
 