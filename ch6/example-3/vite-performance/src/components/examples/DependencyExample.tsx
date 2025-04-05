import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { format } from 'date-fns';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

// Chart.js 컴포넌트 등록
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * 이 컴포넌트는 Vite의 의존성 사전 번들링을 보여줍니다.
 * 
 * 이 모든 의존성이 별도의 패키지임에도 불구하고
 * Vite에 의해 더 빠른 로딩을 위해 사전 번들링되는 것을 확인하세요.
 */
const DependencyExample = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [chartRendered, setChartRendered] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const chartRef = useRef<ChartJS | null>(null);

  // 의존성 사전 번들링을 보여주기 위해 컴포넌트 마운트 후 차트 로드
  useEffect(() => {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (canvas && !chartRendered) {
      // 기존 차트가 있으면 제거
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // 새 차트 생성
      chartRef.current = new ChartJS(canvas, {
        type: 'pie',
        data: {
          labels: ['빨강', '파랑', '노랑', '초록', '보라', '주황'],
          datasets: [
            {
              label: '투표',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
      });
      setChartRendered(true);
    }

    // 컴포넌트 언마운트 시 차트 제거하는 정리 함수
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [chartRendered]);

  // date-fns를 사용하여 현재 시간 포맷팅
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'PPpp'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // lodash를 사용하여 랜덤 숫자 생성
  useEffect(() => {
    setNumbers(_.times(5, () => _.random(1, 100)));
  }, []);

  // axios와 react-query 사용
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      return data;
    }
  });

  return (
    <div className="dependency-example">
      <h2>의존성 사전 번들링 예제</h2>
      <p>
        이 컴포넌트는 Vite에 의해 사전 번들링되는 여러 npm 패키지를 가져옵니다,
        lodash, date-fns, axios, react-query, chart.js 등을 포함합니다.
      </p>
      <p>
        Vite는 esbuild를 사용하여 이러한 의존성을 사전 번들링하며, 이는 
        전통적인 번들러보다 훨씬 빠릅니다. 네트워크 탭에서 사전 번들링된 파일을 확인할 수 있습니다.
      </p>
      
      <div className="example-section">
        <h3>현재 시간 (date-fns 사용):</h3>
        <p>{currentTime}</p>
      </div>
      
      <div className="example-section">
        <h3>랜덤 숫자 (lodash 사용):</h3>
        <ul>
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      
      <div className="example-section">
        <h3>API 호출 (axios와 react-query 사용):</h3>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>데이터 로드 오류</p>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
      
      <div className="example-section">
        <h3>차트 (chart.js 사용):</h3>
        <canvas id="pieChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default DependencyExample; 