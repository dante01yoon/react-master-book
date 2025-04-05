import React, { useState, useEffect } from 'react';
// Import individual functions from lodash-es
// Normally, each of these would trigger separate HTTP requests
// But with Vite's pre-bundling, they're bundled into a single request
import { debounce, throttle, uniq, groupBy, reduce } from 'lodash-es';

/**
 * 이 컴포넌트는 Vite의 의존성 사전 번들링 기능을 보여줍니다.
 * lodash-es는 수백 개의 별도 모듈로 구성되어 있지만, Vite는 이를 사전 번들링하여
 * 수백 개의 HTTP 요청 대신 단일 HTTP 요청으로 로드되도록 합니다.
 */
const PreBundlingExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [throttledValue, setThrottledValue] = useState('');
  const [array, setArray] = useState<number[]>([]);
  const [uniqueArray, setUniqueArray] = useState<number[]>([]);
  const [groupedArray, setGroupedArray] = useState<Record<string, number[]>>({});
  const [sum, setSum] = useState<number>(0);
  
  // 디바운스 함수 설정
  const updateDebounceValue = debounce((value: string) => {
    setDebouncedValue(value);
  }, 500);

  // 스로틀 함수 설정
  const updateThrottleValue = throttle((value: string) => {
    setThrottledValue(value);
  }, 500);

  // 입력값 변경 시 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    updateDebounceValue(newValue);
    updateThrottleValue(newValue);
  };

  // 임의의 배열 생성
  useEffect(() => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10));
    setArray(newArray);
    
    // lodash 함수를 사용하여 배열 처리
    setUniqueArray(uniq(newArray));
    setGroupedArray(groupBy(newArray, (n) => n % 2 === 0 ? 'even' : 'odd'));
    
    // reduce를 사용하여 합계 계산
    const arraySum = reduce(newArray, (sum, n) => sum + n, 0);
    setSum(arraySum);
  }, []);

  return (
    <div className="prebundling-example">
      <h2>Lodash-ES 사전 번들링 예제</h2>
      <p>
        이 예제는 Vite가 lodash-es와 같은 크고 모듈화된 의존성을 어떻게 사전 번들링하는지 보여줍니다.
        lodash-es는 수백 개의 작은 ES 모듈로 구성되어 있으며, 사전 번들링 없이 사용할 경우
        브라우저는 각 함수에 대해 별도의 HTTP 요청을 수행해야 합니다.
      </p>
      <p>
        개발자 도구의 네트워크 탭을 열고 확인하세요 - 
        수백 개의 별도 요청 대신 번들된 파일을 확인할 수 있습니다.
      </p>

      <div className="example-section">
        <h3>디바운스 & 스로틀 데모 (lodash-es):</h3>
        <div className="input-demo">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="여기에 타이핑하세요..."
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <div className="values-display">
            <div>
              <strong>입력값:</strong> {inputValue}
            </div>
            <div>
              <strong>디바운스된 값 (500ms):</strong> {debouncedValue}
            </div>
            <div>
              <strong>스로틀된 값 (500ms):</strong> {throttledValue}
            </div>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>배열 조작 (lodash-es):</h3>
        <div className="array-demo">
          <div>
            <strong>원본 배열:</strong> [{array.join(', ')}]
          </div>
          <div>
            <strong>고유 값:</strong> [{uniqueArray.join(', ')}]
          </div>
          <div>
            <strong>그룹화 (홀수/짝수):</strong>
            <pre>{JSON.stringify(groupedArray, null, 2)}</pre>
          </div>
          <div>
            <strong>배열 합계:</strong> {sum}
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>Vite 사전 번들링이 중요한 이유:</h3>
        <p>
          ESM과 같은 모듈식 패키지는 성능 최적화를 위해 사전 번들링이 필요합니다.
          사전 번들링 없이 lodash-es를 사용하면 브라우저가 600개 이상의 HTTP 요청을 해야 합니다!
          이는 엄청난 성능 저하로 이어집니다.
        </p>
        <p>
          Vite는 esbuild를 사용하여 CommonJS와 UMD 모듈을 ESM으로 변환하고, 모듈화된 
          패키지를 사전 번들링하여 브라우저 성능을 최적화합니다.
        </p>
      </div>
    </div>
  );
};

export default PreBundlingExample; 