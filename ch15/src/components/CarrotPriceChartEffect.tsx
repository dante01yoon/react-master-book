import { useRef, useEffect, useState } from 'react';
import { Chart, registerables, ChartItem, ChartConfiguration, ChartData } from 'chart.js';
import { Helmet } from "react-helmet";

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

  // getChartData: Chart.js 차트의 data 객체를 생성하기 위한 설정 데이터를 반환함
  const getChartData = (data: CarrotData): ChartData<"line"> => {
    return {
      labels: data.years, // x축 레이블 (연도)
      datasets: [{ // 데이터셋 배열
        label: '당근 가격 ($/kg)', // 데이터셋 레이블
        data: data.prices, // y축 데이터 (가격)
        borderColor: 'rgb(255, 159, 64)', // 선 색상
        backgroundColor: 'rgba(255, 159, 64, 0.2)', // 배경 색상 (채우기)
        tension: 0.1, // 선의 곡률
        fill: true // 선 아래 영역 채우기
      }]
    };
  };

  // useEffect: 컴포넌트가 렌더링된 후 실행되는 사이드 이펙트를 처리함
  // Chart.js와 같은 외부 라이브러리를 사용하여 DOM을 직접 조작하는 작업은
  // 리액트의 렌더링 로직과 분리하여 이펙트 훅 내부에서 수행해야 함.
  // 렌더링 단계에서 직접 DOM을 조작하면 리액트의 가상 DOM과의 불일치가 발생할 수 있으며,
  // 예측 불가능한 동작을 유발할 수 있음.
  useEffect(() => {
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
        data: getChartData(data),
        options: { // 차트 옵션
          responsive: true, // 반응형으로 크기 조절
          scales: { // 축 설정
            y: { // y축
              beginAtZero: false, // y축이 0부터 시작하지 않도록 설정
              title: { // y축 제목
                display: true,
                text: '가격 ($/kg)'
              }
            },
            x: { // x축
              title: { // x축 제목
                display: true,
                text: '연도'
              }
            }
          },
          plugins: { // 플러그인 설정
            title: { // 차트 제목
              display: true,
              text: '연도별 당근 가격'
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
      {/* 
        react-helmet 라이브러리를 사용하여 HTML 문서의 <head> 태그를 동적으로 관리함.
        컴포넌트 레벨에서 페이지의 메타 태그, 타이틀 등을 설정할 수 있게 하여 SEO 최적화 및 페이지 정보 관리를 용이하게 함.
      */}
      <Helmet>
        {/* Helmet 컴포넌트 내부에 작성된 태그들은 최종적으로 HTML의 <head> 섹션에 렌더링됨. */}
        <meta name="description" content="annual carrot price explain" />
        <title>골든 래빗 당근 가격 차트</title>
      </Helmet>
      {/* CarrotPriceChart 컴포넌트에 현재 carrotData를 props로 전달함 */}
      <CarrotPriceChart data={carrotData} />
      {/* 버튼 클릭 시 updateData 함수를 호출하여 차트 데이터를 업데이트함 */}
      <button onClick={updateData} style={{ marginTop: '20px', backgroundColor: 'rgba(255, 159, 64, 0.2)' }}>당근 가격 다시 불러오기</button>
    </div>
  );
}

export default App; 