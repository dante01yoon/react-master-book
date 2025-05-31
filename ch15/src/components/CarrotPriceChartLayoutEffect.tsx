import React, { useRef, useLayoutEffect, useState } from 'react';
import { Chart, registerables, ChartItem } from 'chart.js';
Chart.register(...registerables);

interface CarrotData {
  years: string[];
  prices: number[];
}

const CarrotPriceChart = ({ data }: { data: CarrotData }) => {
  // chartRef: 생성된 Chart.js 인스턴스를 저장하기 위한 ref. 차트 업데이트 및 파괴 시 사용함
  const chartRef = useRef<Chart | null>(null);
  // canvasRef: 차트를 그릴 canvas DOM 요소를 참조하기 위한 ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useLayoutEffect: 컴포넌트가 렌더링된 후, 브라우저가 화면을 그리기 직전에 동기적으로 실행되는 사이드 이펙트를 처리함.
  // Chart.js와 같은 외부 라이브러리를 사용하여 DOM을 직접 조작하고, 그 결과를 즉시 화면에 반영해야 할 때 (예: 깜빡임 방지) 사용됨.
  // 렌더링 단계에서 직접 DOM을 조작하는 것은 리액트의 원칙에 어긋나며, 예측 불가능한 결과를 초래할 수 있으므로
  // 반드시 이펙트 훅 내부에서 처리해야 함.
  // useEffect와 마찬가지로 DOM 조작 로직을 포함하지만, 실행 시점이 페인트 이전이라는 점이 다름.
  useLayoutEffect(() => {
    // canvasRef.current가 유효한지 (즉, canvas 요소가 DOM에 마운트되었는지) 확인
    if (canvasRef.current) {
      // 이전 차트 인스턴스가 존재하면 파괴하여 메모리 누수 방지 및 중복 생성 방지
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // canvas 요소로부터 2D 렌더링 컨텍스트를 가져옴
      const ctx = canvasRef.current.getContext('2d') as ChartItem;

      // Chart.js를 사용하여 새로운 차트 인스턴스를 생성하고 chartRef에 저장함
      chartRef.current = new Chart(ctx, {
        type: 'line', // 차트 유형: 선 그래프
        data: {
          labels: data.years, // x축 레이블 (연도)
          datasets: [{
            label: '당근 가격 ($/kg)', // 데이터셋 레이블
            data: data.prices, // y축 데이터 (가격)
            borderColor: 'rgb(255, 159, 64)', // 선 색상
            backgroundColor: 'rgba(255, 159, 64, 0.2)', // 배경 색상 (채우기)
            tension: 0.1, // 선의 곡률
            fill: true // 선 아래 영역 채우기
          }]
        },
        options: {
          responsive: true, // 반응형으로 크기 조절
          scales: {
            y: {
              beginAtZero: false, // y축이 0부터 시작하지 않도록 설정
              title: {
                display: true,
                text: '가격 ($/kg)' // y축 제목
              }
            },
            x: {
              title: {
                display: true,
                text: '연도' // x축 제목
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: '연도별 당근 가격' // 차트 전체 제목
            }
          }
        }
      });
    }

    // 클린업 함수: 컴포넌트가 언마운트되거나, 의존성 배열 [data]의 값이 변경되어
    // 이펙트가 재실행되기 직전에 호출됨.
    // 여기서 이전 차트 인스턴스를 파괴하여 리소스 누수를 방지함.
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]); // 의존성 배열: data가 변경될 때마다 이펙트를 다시 실행함

  return (
    // 차트를 표시할 div 컨테이너. 스타일을 통해 크기를 지정함
    <div style={{ width: '800px', height: '400px' }}>
      {/* 차트가 그려질 canvas 요소. canvasRef를 통해 DOM에 접근함 */}
      <canvas ref={canvasRef} />
    </div>
  );
}

// App 컴포넌트: CarrotPriceChart를 사용하고, 차트 데이터를 관리하며 업데이트 기능을 제공함
const App = () => {
  // useState를 사용하여 차트 데이터(carrotData)의 상태를 관리함
  const [carrotData, setCarrotData] = useState<CarrotData>({
    years: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    prices: [1.20, 1.35, 1.28, 1.45, 1.56, 1.62, 1.58, 1.70, 1.85, 1.95]
  });

  // updateData 함수: 버튼 클릭 시 carrotData를 랜덤하게 업데이트하여 차트를 다시 그리도록 함
  const updateData = () => {
    setCarrotData(prevData => ({
      years: prevData.years, // 연도 데이터는 동일하게 유지
      // 이전 가격에 0.9 ~ 1.1 사이의 랜덤 값을 곱하여 새로운 가격 배열을 생성 (소수점 둘째 자리까지)
      prices: prevData.prices.map(price =>
        Number((price * (0.9 + Math.random() * 0.2)).toFixed(2))
      )
    }));
  };

  return (
    <div>
      {/* CarrotPriceChart 컴포넌트에 현재 carrotData를 props로 전달함 */}
      <CarrotPriceChart data={carrotData} />
      {/* 버튼 클릭 시 updateData 함수를 호출하여 차트 데이터를 업데이트함 */}
      <button onClick={updateData} style={{ marginTop: '20px', backgroundColor: 'rgba(255, 159, 64, 0.2)' }}>당근 가격 다시 불러오기</button>
    </div>
  );
}

export default App; 