import {useState} from 'react';

interface PoemItem {
  author: string;
  content: string;
}

interface AccordionItemProps extends PoemItem {
 isOpen: boolean;
 onClick: () => void;
}

const AccordionItem = ({ author, content, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div>
      <button onClick={onClick} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px', background: '#f1c40f', border: 'none', cursor: 'pointer' }}>
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
  items: PoemItem[]
}

const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const toggleAccordionItem = (index: number) => {
    if(openIndex === index) {
      setOpenIndex(-1)
    }
    else {
      setOpenIndex(index)
    }
  }
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          author={item.author}
          content={item.content}
          onClick={() => toggleAccordionItem(index)}
          isOpen={index === openIndex}
        />
      ))}
    </div>
  );
};


const PoemTreeAccordion = () => {
 const letters = [
   {
     author: '푸시킨',
     content: '삶이 그대를 속일지라도 슬퍼하거나 노하지 말라 슬픈 날엔 참고 견디라 즐거운 날이 오고야 말리니',
   },
   {
     author: '상 파울',
     content: '인생은 한 권의 책과 같습니다. 어리석은 이는 그것을 마구 넘겨 버리지만 현명한 이는 열심히 읽는다. 인생은 단 한 번만 읽을 수 있다는 것을 알기 때문입니다.'
   },
   {
     author: '프리드리히 니체',
     content: "그대가 값진 삶을 살고 싶다면 날마다 아침에 눈뜨는 순간 이렇게 생각하라. '오늘은 단 한 사람을 위해서라도 좋으니 누군가 기뻐할 만한 일을 하고 싶다' 고."
   },
   {
     author: 'Robert Frost',
     content: 'Two roads diverged in a wood, and I took the one less traveled by,\nAnd that has made all the difference.'
   }
 ];

  return (
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', background: '#fff8dc', borderRadius: '8px', border: '2px solid #f1c40f' }}>
        <h4>Lifting Stateup poem tree</h4>
        <Accordion items={letters} />
      </div>
  );
};
