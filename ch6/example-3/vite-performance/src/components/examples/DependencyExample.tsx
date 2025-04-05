import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { format } from 'date-fns';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * This component demonstrates Vite's dependency pre-bundling.
 * 
 * Notice how all these dependencies are pre-bundled by Vite
 * for faster loading, even though they are separate packages.
 */
const DependencyExample = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [chartRendered, setChartRendered] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const chartRef = useRef<ChartJS | null>(null);

  // Load chart after component mounts to demonstrate dependency pre-bundling
  useEffect(() => {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (canvas && !chartRendered) {
      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart
      chartRef.current = new ChartJS(canvas, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: 'Votes',
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

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [chartRendered]);

  // Format current time using date-fns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'PPpp'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Use lodash to generate random numbers
  useEffect(() => {
    setNumbers(_.times(5, () => _.random(1, 100)));
  }, []);

  // Use axios with react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      return data;
    }
  });

  return (
    <div className="dependency-example">
      <h2>Dependency Pre-bundling Example</h2>
      <p>
        This component imports multiple npm packages that are pre-bundled by Vite,
        including lodash, date-fns, axios, react-query, and chart.js.
      </p>
      <p>
        Vite pre-bundles these dependencies using esbuild, which is much faster than
        traditional bundlers. You can see the pre-bundled files in the Network tab.
      </p>
      
      <div className="example-section">
        <h3>Current Time (using date-fns):</h3>
        <p>{currentTime}</p>
      </div>
      
      <div className="example-section">
        <h3>Random Numbers (using lodash):</h3>
        <ul>
          {numbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
      
      <div className="example-section">
        <h3>API Call (using axios and react-query):</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading data</p>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
      
      <div className="example-section">
        <h3>Chart (using chart.js):</h3>
        <canvas id="pieChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default DependencyExample; 