import React, { useState, ReactNode } from 'react';

// 슬롯 패턴을 적용한 모달 컴포넌트의 프롭스 타입
interface ConfigurableModalProps {
  isOpen: boolean;
  onClose: () => void;
  // ➊ 3개의 명명된 슬롯: header, body, footer
  headerContent?: ReactNode;
  bodyContent: ReactNode; // 본문은 필수 슬롯
  footerContent?: ReactNode;
}

const ConfigurableModal: React.FC<ConfigurableModalProps> = ({
  isOpen,
  onClose,
  headerContent,
  bodyContent,
  footerContent,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    // 간단한 스타일링을 적용한 모달 구조
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 슬롯 */}
        {headerContent && (
          <div className="modal-header">
            {headerContent}
          </div>
        )}

        {/* 본문 슬롯 */}
        <div className="modal-body">
          {bodyContent}
        </div>

        {/* 푸터 슬롯 */}
        {footerContent && (
          <div className="modal-footer">
            {footerContent}
          </div>
        )}
        
        {/* 헤더가 없어도 닫기 버튼은 항상 보이도록 처리 */}
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

// 슬롯 패턴을 활용하여 다양한 모달을 만드는 예제
const SlotPatternApp: React.FC = () => {
  const [modalType, setModalType] = useState<'confirm' | 'info' | null>(null);

  // 1. 확인 모달에 채워 넣을 콘텐츠 (JSX 변수)
  const confirmHeader = <h3>삭제 확인</h3>;
  const confirmBody = <p>정말로 이 항목을 삭제하시겠습니까?</p>;
  const confirmFooter = (
    <>
      <button onClick={() => setModalType(null)}>취소</button>
      <button onClick={() => { alert('삭제됨!'); setModalType(null); }}>삭제</button>
    </>
  );

  // 2. 정보 모달에 채워 넣을 콘텐츠
  const infoBody = <p>새로운 기능이 추가되었습니다.</p>;
  const infoFooter = <button onClick={() => setModalType(null)}>확인</button>;

  return (
    <div>
      <button onClick={() => setModalType('confirm')}>삭제 확인 모달 열기</button>
      <button onClick={() => setModalType('info')}>정보 모달 열기</button>

      {/* ➋ 확인 모달: 모든 슬롯에 콘텐츠 전달 */}
      <ConfigurableModal
        isOpen={modalType === 'confirm'}
        onClose={() => setModalType(null)}
        headerContent={confirmHeader}
        bodyContent={confirmBody}
        footerContent={confirmFooter}
      />

      {/* ➌ 정보 모달: body와 footer 슬롯만 사용 */}
      <ConfigurableModal
        isOpen={modalType === 'info'}
        onClose={() => setModalType(null)}
        // headerContent는 생략
        bodyContent={infoBody}
        footerContent={infoFooter}
      />
    </div>
  );
};

export default SlotPatternApp;