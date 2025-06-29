import React, { ReactNode } from 'react';
import { createHost, createSlot } from 'create-slots';

// ➊ 슬롯의 '타입' 또는 '설계도'를 명시적으로 정의함
const ModalHeader = createSlot('div');
const ModalBody = createSlot('div');
const ModalFooter = createSlot('div');

interface ModalProps {
  children: ReactNode; // 슬롯 컴포넌트들을 children으로 받음
  isOpen: boolean;
  onClose: () => void;
}

// 모달 컴포넌트 정의
export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  // ➋ createHost를 사용하여 children에서 각 슬롯을 찾아 렌더링
  return createHost(children, (Slots) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* ➌ 정의된 슬롯이 존재할 경우, 해당 위치에 렌더링함 */}
        {Slots.get(ModalHeader) && (
          <div className="modal-header">{Slots.get(ModalHeader)}</div>
        )}
        <div className="modal-body">{Slots.get(ModalBody)}</div>
        {Slots.get(ModalFooter) && (
          <div className="modal-footer">{Slots.get(ModalFooter)}</div>
        )}
        
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
    </div>
  ));
};

// ➍ API의 편의성을 위해 슬롯 컴포넌트를 Modal의 정적 속성으로 할당
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

// 간단한 스타일 (실제 프로젝트에서는 CSS 파일 또는 CSS-in-JS 사용 권장)
const styles = `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 80%;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 1.2em;
  font-weight: bold;
}

.modal-body {
  margin-bottom: 10px;
}

.modal-footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
`;

// 스타일을 동적으로 추가하는 컴포넌트 (간단 예제용)
export const ModalStyles = () => {
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  return null;
}; 