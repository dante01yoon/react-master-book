import React from 'react';

// 드래그앤드롭 예제 컴포넌트
function DragDrop() {
  // 드래그 시작 이벤트 핸들러
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // 드래그되는 요소의 ID를 데이터로 설정
    event.dataTransfer.setData('text/plain', (event.target as HTMLDivElement).id);
    
    // 드래그 효과 설정
    event.dataTransfer.effectAllowed = 'move';
    
    // 드래그 이미지 커스터마이징 (선택 사항)
    // const dragIcon = document.createElement('img');
    // dragIcon.src = 'drag-icon.png';
    // event.dataTransfer.setDragImage(dragIcon, 0, 0);
  };

  // 드래그 오버 이벤트 핸들러
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    // 기본 동작 방지 (필수: 드롭 영역으로 인식하기 위함)
    event.preventDefault();
    
    // 커서 모양 변경을 위한 드롭 효과 설정
    event.dataTransfer.dropEffect = 'move';
  };

  // 드롭 이벤트 핸들러
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    // 기본 동작 방지
    event.preventDefault();
    
    // 드래그 시작 시 저장한 데이터 가져오기
    const data = event.dataTransfer.getData('text/plain');
    console.log('드롭된 데이터:', data);
    
    // 실제 애플리케이션에서는 여기서 상태 업데이트 등을 수행
    // setItems(prev => [...]);
    
    // 합성 이벤트의 native 이벤트 접근 예시
    console.log('네이티브 이벤트:', event.nativeEvent);
  };

  // 드래그 엔터 이벤트 핸들러 (선택적 구현)
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // 드롭 영역에 진입했을 때 스타일 변경 등을 위해 사용
    event.currentTarget.classList.add('drag-over');
  };

  // 드래그 리브 이벤트 핸들러 (선택적 구현)
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    // 드롭 영역에서 나갔을 때 스타일 원복 등을 위해 사용
    event.currentTarget.classList.remove('drag-over');
  };

  return (
    <div className="drag-drop-container">
      <h2>리액트 합성 이벤트: 드래그앤드롭 예제</h2>
      
      {/* 드래그 가능한 요소 */}
      <div
        id="draggableItem"
        draggable="true"
        onDragStart={handleDragStart}
        style={{
          width: '150px',
          height: '75px',
          backgroundColor: 'gold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          userSelect: 'none' // 드래그 중 텍스트 선택 방지
        }}>
        이 요소를 드래그하세요
      </div>
      
      {/* 드롭 영역 */}
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        style={{
          width: '300px',
          height: '200px',
          border: '2px dashed #aaa',
          borderRadius: '8px',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666'
        }}>
        여기에 드롭하세요
      </div>
      
      <div className="explanation" style={{ marginTop: '20px', fontSize: '14px' }}>
        <p>
          위 예제는 리액트 합성 이벤트(Synthetic Event)를 사용한 드래그앤드롭 구현을 보여줍니다.
          각 이벤트 핸들러는 React.DragEvent 타입의 합성 이벤트를 받습니다.
        </p>
      </div>
    </div>
  );
}

export default DragDrop; 