import { useState } from 'react';

// ➊ 피보나치 수를 계산하는 함수
function calculateFibonacci(n: number): number {
  if (n <= 1) return 1;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

// ➋ 복잡한 패턴을 생성하는 함수
// seed 값과 크기를 기반으로 HSL 색상 문자열 배열을 생성함
function generateComplexPattern(seed: number, size: number): string[] {
  let pattern: string[] = []; // 생성될 패턴을 저장할 배열
  for (let i = 0; i < size; i++) {
    // 피보나치 수열을 사용하여 값 생성
    let value = calculateFibonacci(seed + (i % 10));
    // HSL 색상 문자열로 변환하여 패턴 배열에 추가
    pattern.push(`hsl(${value % 360}, 70%, 50%)`);
  }
  return pattern; // 생성된 패턴 배열 반환
}

// 최적화되지 않은 토끼 패턴 컴포넌트
function UnoptimizedRabbitPattern() {
  // 패턴 생성에 사용될 seed 상태와 그 설정 함수
  const [seed, setSeed] = useState(10);
  // 버튼 클릭 횟수를 저장하는 상태와 그 설정 함수
  const [count, setCount] = useState(0);

  // ➊ 컴포넌트가 리렌더링될 때마다 generateComplexPattern 함수가 호출됨
  //    seed 값이 변경되지 않아도, count 상태 변경 등으로 리렌더링되면 불필요하게 재계산됨
  const colors = generateComplexPattern(seed, 20);
 
  return (
    <div className="p-4 border rounded-lg">
      {/* 현재 seed 값을 보여주는 제목 */}
      <h2 className="text-xl font-bold mb-4">최적화되지 않은 버전의 시드: {seed}</h2>
      {/* 생성된 색상 패턴을 시각적으로 표시하는 부분 */}
      <div className="flex gap-2 mb-4">
        {/* ➋colors 배열을 순회하며 각 색상에 해당하는 div를 렌더링함 */}
        {colors.map((color, i) => (
          <div
            key={i} // 리액트 리스트 렌더링 시 필요한 key 속성
            className="w-8 h-8 rounded"
            style={{ backgroundColor: color }} // 각 div의 배경색을 설정함
          />
        ))}
      </div>
     
      {/* 패턴 변경 버튼 */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        onClick={() => setSeed(s => s + 1)} // 클릭 시 seed 값을 1 증가시켜 패턴을 변경함
      >
        패턴 변경하기
      </button>
     
      {/* 클릭 횟수 증가 버튼 (패턴과 관계없는 상태 변경) */}
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded"
        onClick={() => setCount(c => c + 1)} // 클릭 시 count 값을 1 증가시킴
      >
        클릭 횟수: {count}
      </button>
    </div>
  );
 }
