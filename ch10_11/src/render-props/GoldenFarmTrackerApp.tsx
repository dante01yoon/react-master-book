import React from 'react';
import RabbitPositionTracker from './RabbitPositionTracker'; // 위에서 만든 컴포넌트 임포트

const GoldenFarmApp: React.FC = () => {
  return (
    <div>
      <h1>토끼를 따라가 보세요!</h1>
      <p>아래 회색 점선 상자 안에서 마우스를 움직여보세요.</p>

      {/* RabbitPositionTracker를 사용하여 '위치' 데이터를 얻음 */}
      <RabbitPositionTracker>
        {/* 이 함수가 '렌더 프롭'임 */}
        {(position) => (
          <div
            style={{
              position: 'absolute',
              // position 객체에 따라 위치가 동적으로 변경됨
              left: position.x,
              top: position.y,
              // 이모지가 커서 중앙에 오도록 위치 보정
              transform: 'translate(-50%, -50%)', 
              fontSize: '2em',
            }}
          >
            🐇
          </div>
        )}
      </RabbitPositionTracker>
    </div>
  );
};

export default GoldenFarmApp;
