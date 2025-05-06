import React, { ReactNode, useState } from 'react';

// ConfigurableModal 컴포넌트의 프롭스 타입을 정의함
interface ConfigurableModalProps {
  isOpen: boolean; // 모달의 열림/닫힘 상태를 제어하는 프롭스
  onClose: () => void; // 모달을 닫기 위해 호출될 함수 프롭스
  headerContent?: ReactNode; // 모달 헤더 영역에 렌더링될 내용을 받는 프롭스 (슬롯 1)
  bodyContent: ReactNode; // 모달 본문 영역에 렌더링될 내용을 받는 프롭스 (필수 슬롯 2)
  footerContent?: ReactNode; // 모달 푸터 영역에 렌더링될 내용을 받는 프롭스 (슬롯 3)
}

/**
 * 특수화(Specialization) 패턴 예시: ConfigurableModal 컴포넌트.
 * 이 컴포넌트는 정해진 구조(헤더, 본문, 푸터)를 가지며, 각 영역에 어떤 내용을 채울지는
 * 부모 컴포넌트가 명명된 프롭스(headerContent, bodyContent, footerContent)를 통해 결정함.
 * 이는 단순 children을 사용하는 Containment 패턴보다 더 구조화된 합성을 가능하게 함.
 */
const ConfigurableModal: React.FC<ConfigurableModalProps> = ({
  isOpen,
  onClose,
  headerContent,
  bodyContent,
  footerContent,
}) => {
  // 모달이 닫혀 있으면 아무것도 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  // 모달 오버레이 스타일
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검은색 배경
    display: 'flex',
    justifyContent: 'center', // 가로 중앙 정렬
    alignItems: 'center', // 세로 중앙 정렬
    zIndex: 1000, // 다른 요소들 위에 표시
  };

  // 모달 컨텐츠 박스 스타일
  const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '80%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  // 모달 헤더 영역 스타일
  const headerStyle: React.CSSProperties = {
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between', // 제목과 닫기 버튼 양쪽 정렬
    alignItems: 'center',
  };

  // 모달 본문 영역 스타일
  const bodyStyle: React.CSSProperties = {
    marginBottom: '15px',
  };

  // 모달 푸터 영역 스타일
  const footerStyle: React.CSSProperties = {
    borderTop: '1px solid #eee',
    paddingTop: '10px',
    textAlign: 'right', // 푸터 내용 오른쪽 정렬
  };
  
  // 닫기 버튼 스타일
  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  };

  return (
    <div style={overlayStyle} onClick={onClose}> {/* 오버레이 클릭 시 닫힘 */}
      {/* 이벤트 버블링 방지: 모달 내부 클릭 시 오버레이의 onClick이 실행되지 않도록 함 */}
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* 헤더 영역: headerContent가 제공되면 렌더링함 */}
        {headerContent && (
          <div style={headerStyle}>
            {/* 부모로부터 전달받은 헤더 내용을 렌더링 */}
            <div>{headerContent}</div> 
            <button style={closeButtonStyle} onClick={onClose}>&times;</button> {/* 닫기 버튼 */}
          </div>
        )}
        {/* 헤더가 없을 경우를 대비한 기본 닫기 버튼 (헤더 있을 때와 중복 피하기 위해 조건부 렌더링) */}
        {!headerContent && (
           <div style={{ textAlign: 'right' }}>
             <button style={closeButtonStyle} onClick={onClose}>&times;</button>
           </div>
         )}

        {/* 본문 영역: 필수 프롭스인 bodyContent를 렌더링함 */}
        <div style={bodyStyle}>
          {/* 부모로부터 전달받은 본문 내용을 렌더링 */}
          {bodyContent}
        </div>

        {/* 푸터 영역: footerContent가 제공되면 렌더링함 */}
        {footerContent && (
          <div style={footerStyle}>
            {/* 부모로부터 전달받은 푸터 내용을 렌더링 */}
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * ConfigurableModal 컴포넌트를 사용하는 예시 애플리케이션 컴포넌트.
 * Specialization 패턴을 활용하여 다양한 종류의 모달을 생성함.
 */
const SpecializationApp: React.FC = () => {
  // 각 모달의 열림/닫힘 상태를 관리하기 위한 state 훅 사용
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // 확인 모달을 위한 컨텐츠 정의
  const confirmHeader = <h3>삭제 확인</h3>;
  const confirmBody = <p>정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>;
  const confirmFooter = (
    <>
      <button onClick={() => setIsConfirmOpen(false)} style={{ marginRight: '5px' }}>취소</button>
      <button onClick={() => { alert('삭제됨!'); setIsConfirmOpen(false); }} style={{ backgroundColor: 'red', color: 'white' }}>삭제</button>
    </>
  );

  // 정보 모달을 위한 컨텐츠 정의 (헤더 없이)
  const infoBody = (
    <div>
      <h4>업데이트 안내</h4>
      <p>새로운 기능이 추가되었습니다. 자세한 내용은 공지사항을 확인해주세요.</p>
    </div>
  );
  const infoFooter = <button onClick={() => setIsInfoOpen(false)}>확인</button>;

  return (
    <div>
      <button onClick={() => setIsConfirmOpen(true)}>삭제 확인 모달 열기</button>
      <button onClick={() => setIsInfoOpen(true)} style={{ marginLeft: '10px' }}>정보 모달 열기</button>

      {/* 확인 모달: 헤더, 본문, 푸터 슬롯에 정의된 내용을 전달함 */}
      <ConfigurableModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        headerContent={confirmHeader}
        bodyContent={confirmBody}
        footerContent={confirmFooter}
      />

      {/* 정보 모달: 본문과 푸터 슬롯만 사용하고 헤더는 생략함 */}
      <ConfigurableModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        // headerContent는 전달하지 않음
        bodyContent={infoBody}
        footerContent={infoFooter}
      />
    </div>
  );
};


export default SpecializationApp; 