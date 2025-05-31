import { useState, useTransition, useDeferredValue, ChangeEvent, memo, useEffect } from 'react';
import { fetchQuotesAPI } from '../utils/api';

interface BubbleListProps {
  size: number;
  text?: string;
}

// React.memo로 BubbleList를 감싸서 props가 변경되지 않으면 리렌더링을 방지함
const BubbleList = memo(({ size, text = ""}: BubbleListProps) => {
  // console.log('BubbleList rendered with size:', size, 'text:', text);
  const newList: string[] = [];
  // ➊ props로 전달되는 size 값만큼 반복하여 새로운 리스트를 생성함.
  // 이는 CPU를 많이 사용하여 메인 스레드를 블로킹하는 동작을 모방하기 위함.
  for (let i = 0; i < size; i++) {
    newList.push(`버블 ${i} ${text}`);
  }

  return (
    <div className="relative h-[60vh] overflow-hidden bg-white rounded-lg shadow">
      {newList.map((item, index) => (
        <div
          key={index}
          className="absolute animate-pop bg-indigo-100 rounded-full p-2 text-xs"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDelay: `${index * 0.01}s` // 많은 요소에 적용 시 부하 가능성 있음
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
});
BubbleList.displayName = 'BubbleList'; // React.memo 사용 시 displayName 설정 권장

// TextInput 컴포넌트 정의
interface BubbleTextInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const BubbleTextInput = ({ value, onChange, label }: BubbleTextInputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};
BubbleTextInput.displayName = 'BubbleTextInput';

// Range Slider 컴포넌트 정의
interface BubbleRangeSliderProps {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min: string;
  max: string;
  labelValue: number; // 라벨에 표시될 현재 값
  labelText: string; // 라벨 템플릿 (예: "버블 숫자: ")
}

const BubbleRangeSlider = ({
  value,
  onChange,
  min,
  max,
  labelValue,
  labelText,
}: BubbleRangeSliderProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {labelText} {labelValue}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value} // 이 value가 즉각적으로 업데이트되어야 슬라이더가 부드럽게 움직임
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
};
BubbleRangeSlider.displayName = 'BubbleRangeSlider';

const BubbleGenerator = () => {
  // 사용자가 입력하는 텍스트를 위한 상태. 즉시 업데이트됨.
  const [inputValue, setInputValue] = useState('');
  // ➋ useTransition 훅을 사용하여 isPending 상태와 startTransition 함수를 가져옴.
  // isPending: 트랜지션이 진행 중인지 여부를 나타내는 boolean 값.
  // startTransition: 상태 업데이트를 트랜지션으로 표시하는 함수.
  const [isPending, startTransition] = useTransition();
  
  useEffect(() => {
    console.log(1);
    startTransition(async () => {
      const data  = await fetchQuotesAPI("쿼리");
      console.log('data: ', data);
      console.log(2);
    });
    console.log(3);
  },[]);
 

  // listSize: BubbleList에 실제로 전달될 버블의 수 (트랜지션에 의해 업데이트됨)
  const [listSize, setListSize] = useState(1);
  // currentSliderValue: 슬라이더의 현재 시각적 위치 (즉시 업데이트됨)
  const [currentSliderValue, setCurrentSliderValue] = useState(1);

  // inputValue의 지연된 값을 생성함. 텍스트 입력은 즉시 inputValue를 업데이트하지만,
  const deferredInputValue = useDeferredValue(inputValue);

  // 텍스트 입력 핸들러, 즉각적인 업데이트를 수행
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 슬라이더를 움직일 때마다 호출됨
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSliderValue = parseInt(e.target.value, 10);
    // 슬라이더의 시각적 위치는 즉시 업데이트
    setCurrentSliderValue(newSliderValue);
    
    // listSize (버블 리스트 크기) 업데이트는 트랜지션으로 처리
    startTransition(() => {
      setListSize(newSliderValue);
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* 텍스트 입력 필드를 BubbleTextInput 컴포넌트로 대체 */}
      <BubbleTextInput
        label="버블에 글자 새기기:"
        value={inputValue}
        onChange={handleInputChange}
      />

      {/* 슬라이더 컴포넌트 */}
      <BubbleRangeSlider
        min="1"
        max="30000" // 이 값은 필요에 따라 조정 가능
        value={currentSliderValue}
        onChange={handleSliderChange}
        labelValue={listSize} // 라벨에는 실제 반영될 listSize 표시 (또는 currentSliderValue)
        labelText={`버블 숫자`}
      />
      
      {/* ➏ isPending이 true이면 "버블 만드는 중..." 메시지를 표시함.
          이는 startTransition으로 감싼 작업(listSize 변경으로 인한 버블 재생성)이 진행 중임을 사용자에게 알림. */}
      {isPending ? (
        <p className="text-indigo-600 font-semibold">버블 만드는 중...</p>
      ) : (
        // BubbleList에 deferredInputValue를 text로 전달함.
        // deferredInputValue가 전달되어 무거운 렌더링이 즉각적인 입력 반응을 막지 않도록 함.
        <BubbleList size={listSize} text={deferredInputValue} />
      )}
    </div>
  );
}

export default BubbleGenerator;