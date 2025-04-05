import React from 'react';

const LazyComponent1 = () => {
  return (
    <div className="lazy-component" style={{ padding: '20px', background: '#f0f8ff', borderRadius: '8px' }}>
      <h3>Lazy Component 1</h3>
      <p>
        This component was loaded on-demand. Vite only transpiled this file when you
        requested it by clicking the button.
      </p>
      <p>
        Check the Network tab in your browser's DevTools to see that this file was
        only loaded when you clicked the button, not during the initial page load.
      </p>
      <div style={{ marginTop: '20px', padding: '15px', background: '#e6f7ff', borderRadius: '4px' }}>
        <h4>Component Details:</h4>
        <ul>
          <li>Component ID: 1</li>
          <li>File Size: Small (check Network tab)</li>
          <li>Load Time: Fast (dynamic import)</li>
        </ul>
      </div>
    </div>
  );
};

export default LazyComponent1; 