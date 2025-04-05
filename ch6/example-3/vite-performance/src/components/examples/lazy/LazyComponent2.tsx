import React from 'react';

const LazyComponent2 = () => {
  return (
    <div className="lazy-component" style={{ padding: '20px', background: '#ffe6e6', borderRadius: '8px' }}>
      <h3>Lazy Component 2</h3>
      <p>
        This is another component that was loaded on-demand. Notice how it appears
        almost instantly thanks to Vite's fast on-demand transpilation.
      </p>
      <p>
        Unlike traditional bundlers that rebuild the entire bundle on any change,
        Vite only processes this specific file when it's requested.
      </p>
      <div style={{ marginTop: '20px', padding: '15px', background: '#ffcccc', borderRadius: '4px' }}>
        <h4>On-Demand Features:</h4>
        <ul>
          <li>No unnecessary transpilation</li>
          <li>No bundle regeneration</li>
          <li>Native ES module import</li>
          <li>Instant module replacement</li>
        </ul>
      </div>
    </div>
  );
};

export default LazyComponent2; 