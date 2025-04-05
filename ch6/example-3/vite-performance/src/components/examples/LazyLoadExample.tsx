import React, { useState, lazy, Suspense } from 'react';

// These components are lazily loaded to demonstrate on-demand transpilation
const LazyComponent1 = lazy(() => import('./lazy/LazyComponent1'));
const LazyComponent2 = lazy(() => import('./lazy/LazyComponent2'));
const LazyComponent3 = lazy(() => import('./lazy/LazyComponent3'));

/**
 * This component demonstrates Vite's on-demand transpilation through lazy loading.
 * 
 * Each component is only loaded and transpiled when needed, reducing initial load time
 * and improving performance.
 */
const LazyLoadExample = () => {
  const [activeComponent, setActiveComponent] = useState<number | null>(null);

  return (
    <div className="lazy-load-example">
      <h2>On-Demand Transpilation with Lazy Loading</h2>
      <p>
        Vite only transpiles files when they're requested by the browser.
        This example demonstrates this feature by lazily loading components.
      </p>
      <p>
        Open the Network tab in DevTools and observe how JavaScript files are
        only loaded when you click on the buttons below.
      </p>
      
      <div className="buttons">
        <button onClick={() => setActiveComponent(1)}>Load Component 1</button>
        <button onClick={() => setActiveComponent(2)}>Load Component 2</button>
        <button onClick={() => setActiveComponent(3)}>Load Component 3</button>
        {activeComponent && (
          <button onClick={() => setActiveComponent(null)}>Hide Component</button>
        )}
      </div>
      
      <div className="component-container">
        <Suspense fallback={<div>Loading component...</div>}>
          {activeComponent === 1 && <LazyComponent1 />}
          {activeComponent === 2 && <LazyComponent2 />}
          {activeComponent === 3 && <LazyComponent3 />}
        </Suspense>
      </div>
    </div>
  );
};

export default LazyLoadExample; 