import React, { useContext } from 'react';
import { ThemeContext, ConditionalReaderProps } from './shared';

function ConditionalReaderWithUseContext({ isActive }: ConditionalReaderProps) {
  // ➊ 훅의 규칙 때문에, isActive 값과 관계없이 항상 최상위에서 호출됨
  const theme = useContext(ThemeContext);

  // `isActive`가 false이면, 컨텍스트 값을 사용하지 않음에도 불구하고
  // 이미 컨텍스트 읽기 작업은 완료된 상태임
  if (!isActive) {
    return <p>컴포넌트 비활성화 상태: 컨텍스트 읽기는 수행했으나 사용하지 않음.</p>;
  }

  if (theme === null) {
    return <p>테마 정보 없음.</p>;
  }

  return <p style={/* ... */}>현재 활성 테마 (<code>useContext</code> 사용): {theme}</p>;
}