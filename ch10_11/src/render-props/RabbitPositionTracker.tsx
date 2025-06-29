import React, { useState } from 'react';

// 렌더 프롭으로 전달될 함수의 타입 정의
// position 객체를 인자로 받아 React 노드를 반환함
type RenderProp = (position: { x: number; y: number }) => React.ReactNode;

// 컴포넌트의 프롭스 타입 정의
interface RabbitPositionTrackerProps {
  // ➊ 렌더링을 책임질 함수를 children 프롭으로 받음
  children: RenderProp;
}

const RabbitPositionTracker: React.FC<RabbitPositionTrackerProps> = ({ children }) => {
  // ➋ 컴포넌트가 직접 '위치' 상태를 관리함
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // 부모 div의 상대적 위치 대신, 페이지 전체의 client 좌표를 사용
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    // ➌ 마우스 움직임을 감지할 영역
    <div
      style={{ border: '1px dashed #ccc', minHeight: '300px', position: 'relative' }}
      onMouseMove={handleMouseMove}
    >
      {/* ➍ children으로 받은 함수를 호출하여 현재 위치(position)를 전달함 */}
      {children(position)}
    </div>
  );
};

export default RabbitPositionTracker;