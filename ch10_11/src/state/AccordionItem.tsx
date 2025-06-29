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

export default AccordionItem;