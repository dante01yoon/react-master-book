import { useState } from 'react';

// 아코디언 아이템 데이터 타입 정의
interface PoemItem {
  author: string;
  content: string;
}

interface AccordionItemProps extends PoemItem {
  isOpen: boolean; // ➊ 부모로부터 자신의 열림/닫힘 상태를 전달받음
  onClick: () => void; // ➋ 클릭되었을 때 호출할 함수를 부모로부터 전달받음
}

// AccordionItem: 상태를 소유하지 않음
const AccordionItem = ({
  author,
  content,
  isOpen,
  onClick,
}: AccordionItemProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'left',
          padding: '10px',
          background: '#f1c40f',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {author}
      </button>
      {isOpen && (
        <div style={{ padding: '10px', border: '1px solid #f1c40f' }}>
          {content}
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
  items: PoemItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  // ➌ 현재 열린 아이템의 인덱스를 단일 상태로 관리 (단일 출처)
  // -1은 모든 아이템이 닫힌 상태를 의미함
  const [openIndex, setOpenIndex] = useState(-1);

  const handleItemClick = (index: number) => {
    // 이미 열려있는 아이템을 클릭하면 닫고, 닫힌 아이템을 클릭하면 염
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          author={item.author}
          content={item.content}
          // ➎ 현재 열려야 할 인덱스와 자신의 인덱스를 비교하여 isOpen 값을 결정
          isOpen={openIndex === index}
          // ➍ 클릭 이벤트가 발생하면, 부모의 상태를 변경하는 함수를 호출
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;