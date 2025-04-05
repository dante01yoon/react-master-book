import React, { useState } from 'react';

const LazyComponent3 = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="lazy-component" style={{ padding: '20px', background: '#e6ffe6', borderRadius: '8px' }}>
      <h3>Lazy Component 3</h3>
      <p>
        This is a stateful component loaded on-demand. The state is preserved
        as long as the component is mounted.
      </p>
      <p>
        This example also demonstrates the efficient HMR (Hot Module Replacement)
        capabilities in Vite, powered by native ESM.
      </p>
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#ccffcc', borderRadius: '4px' }}>
        <h4>Interactive Counter:</h4>
        <p>Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ 
            padding: '8px 16px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ 
            padding: '8px 16px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default LazyComponent3; 