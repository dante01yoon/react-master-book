import React, { useState } from 'react';
import { Modal, ModalStyles } from './Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* 모달 열기 버튼 */}
      <button onClick={openModal}>모달 열기</button>

      {/* 모달 컴포넌트와 슬롯 사용 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/*
          슬롯 컴포넌트 사용:
          - Modal.Header, Modal.Body, Modal.Footer는 Modal의 직접적인 자식으로 위치함
          - 실제 내용은 각 슬롯 컴포넌트의 JSX 자식으로 전달함 (create-slots 방식)
        */}
        <Modal.Header>
          <div>슬롯 패턴 모달 예제</div>
        </Modal.Header>

        <Modal.Body>
          <>
            <p>이것은 `create-slots` 라이브러리를 사용한 모달의 본문입니다.</p>
            <p>슬롯을 사용하면 컴포넌트의 특정 영역에 내용을 명시적으로 전달할 수 있습니다.</p>
          </>
        </Modal.Body>

        <Modal.Footer>
          <>
            <button onClick={closeModal}>취소</button>
            <button onClick={() => { alert('확인됨!'); closeModal(); }}>확인</button>
          </>
        </Modal.Footer>
      </Modal>

      {/* 모달 스타일 적용 (별도 컴포넌트로 분리) */}
      <ModalStyles />
    </div>
  );
}

export default App; 