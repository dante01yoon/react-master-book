import React, { useState } from 'react';
import { Modal, ModalStyles } from './Modal';
import React, { useState } from 'react';
import { Modal } from './Modal';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>슬롯 모달 열기</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* ➊ 각 슬롯에 해당하는 컴포넌트를 사용하여 내용을 명시적으로 채움 */}
        <Modal.Header>
          <strong>슬롯 패턴 모달 예제</strong>
        </Modal.Header>

        <Modal.Body>
          <p>이것은 `create-slots` 라이브러리를 사용한 모달의 본문입니다.</p>
          <p>슬롯을 사용하면 컴포넌트의 특정 영역에 내용을 명시적으로 전달할 수 있습니다.</p>
        </Modal.Body>

        <Modal.Footer>
          <button onClick={() => setIsOpen(false)}>취소</button>
          <button onClick={() => { alert('확인됨!'); setIsOpen(false); }}>확인</button>
        </Modal.Footer>
      </Modal>

      <ModalStyles />
    </div>
  );
};

export default App;