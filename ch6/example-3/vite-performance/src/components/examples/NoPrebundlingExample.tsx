import React, { useState } from 'react';

/**
 * This component illustrates what happens WITHOUT Vite's dependency pre-bundling.
 * We can't actually show this in real-time (since Vite always pre-bundles),
 * but we can demonstrate the concept with a visual comparison.
 */
const NoPrebundlingExample = () => {
  const [showNetworkRequests, setShowNetworkRequests] = useState(false);

  // Sample URLs to represent what would happen without pre-bundling
  const lodashModules = [
    '/lodash-es/debounce.js',
    '/lodash-es/_root.js',
    '/lodash-es/now.js',
    '/lodash-es/_Symbol.js', 
    '/lodash-es/_baseGetTag.js',
    '/lodash-es/isObject.js',
    '/lodash-es/isSymbol.js',
    '/lodash-es/toNumber.js',
    '/lodash-es/_trimmedEndIndex.js',
    '/lodash-es/_baseTrim.js',
    // ... imagine hundreds more
  ];

  return (
    <div className="no-prebundling-example">
      <h2>Without Pre-bundling: The 600+ HTTP Requests Problem</h2>
      
      <div 
        className="demo-banner" 
        style={{ 
          padding: '15px', 
          backgroundColor: '#ff4d4d', 
          color: 'white',
          borderRadius: '8px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>🔥 Interactive Demos: See 600+ Requests in Action!</h3>
        <p style={{ margin: '0 0 10px 0' }}>
          See for yourself what happens without pre-bundling through these two demos:
        </p>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          <a 
            href="/real-imports-demo.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: 'white',
              color: '#ff4d4d',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderRadius: '4px',
              marginTop: '5px'
            }}
          >
            Direct lodash-es Import Demo →
          </a>
          <a 
            href="/no-bundling-demo.html" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: 'white',
              color: '#ff4d4d',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderRadius: '4px',
              marginTop: '5px'
            }}
          >
            Simulated Requests Demo →
          </a>
        </div>
      </div>
      
      <div className="info-box" style={{ padding: '15px', backgroundColor: '#fff4f4', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>The Problem Vite Solves</h3>
        <p>
          When using ES modules without pre-bundling, importing even a single function from a 
          library like lodash-es would trigger hundreds of cascading HTTP requests.
        </p>
        <p>
          <strong>Why this happens:</strong> lodash-es is written in a way where each function 
          is its own ES module with its own dependencies. When you import just one function like 
          <code>debounce</code>, the browser has to:
        </p>
        <ol>
          <li>Request the main function file</li>
          <li>Parse it and find its dependencies</li>
          <li>Request each dependency</li>
          <li>Parse those and request their dependencies</li>
          <li>...and so on, potentially hundreds of times</li>
        </ol>
      </div>

      <div className="comparison" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        <div className="without-prebundling" style={{ flex: 1, minWidth: '300px', padding: '15px', backgroundColor: '#ffebeb', borderRadius: '8px' }}>
          <h3>Without Pre-bundling</h3>
          <p>A single <code>import {'{'} debounce {'}'} from 'lodash-es'</code> creates:</p>
          <ul>
            <li><strong>600+ HTTP requests</strong></li>
            <li>Browser network congestion</li>
            <li>Slower page load times</li>
            <li>Waterfall loading pattern</li>
          </ul>
          <button 
            onClick={() => setShowNetworkRequests(!showNetworkRequests)}
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showNetworkRequests ? 'Hide Network Requests' : 'Show Example Network Requests'}
          </button>
        </div>

        <div className="with-prebundling" style={{ flex: 1, minWidth: '300px', padding: '15px', backgroundColor: '#ebffeb', borderRadius: '8px' }}>
          <h3>With Vite's Pre-bundling</h3>
          <p>The same import becomes:</p>
          <ul>
            <li><strong>1 HTTP request</strong></li>
            <li>No browser network congestion</li>
            <li>Faster page load times</li>
            <li>Simple, direct loading</li>
          </ul>
          <div style={{ 
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            /vite/deps/lodash-es.js
          </div>
        </div>
      </div>

      {showNetworkRequests && (
        <div className="network-requests" style={{ maxHeight: '300px', overflowY: 'auto', padding: '15px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
          <h3>Sample of Network Requests Without Pre-bundling</h3>
          <p>In real-world scenarios without pre-bundling, your browser would make hundreds of requests like these:</p>
          <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '5px', borderBottom: '1px solid #ddd' }}>File</th>
                  <th style={{ textAlign: 'right', padding: '5px', borderBottom: '1px solid #ddd' }}>Size</th>
                  <th style={{ textAlign: 'right', padding: '5px', borderBottom: '1px solid #ddd' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {lodashModules.map((module, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    <td style={{ padding: '5px' }}>{module}</td>
                    <td style={{ textAlign: 'right', padding: '5px' }}>{Math.floor(Math.random() * 5 + 1)}KB</td>
                    <td style={{ textAlign: 'right', padding: '5px' }}>{Math.floor(Math.random() * 200 + 20)}ms</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} style={{ padding: '5px', textAlign: 'center', fontStyle: 'italic' }}>
                    ... and approximately 590 more requests
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="visual-comparison" style={{ marginTop: '30px' }}>
        <h3>Visual Comparison</h3>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
            <h4>Without Pre-bundling</h4>
            <div style={{ 
              height: '200px', 
              background: 'linear-gradient(to bottom, #ff6b6b 0%, #ff8585 100%)',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Visualization of many requests */}
              {Array.from({ length: 100 }).map((_, i) => (
                <div 
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${Math.random() * 90}%`,
                    top: `${Math.random() * 90}%`,
                    width: '3px',
                    height: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%'
                  }}
                />
              ))}
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: 'bold'
              }}>
                600+ Requests
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
            <h4>With Vite's Pre-bundling</h4>
            <div style={{ 
              height: '200px', 
              background: 'linear-gradient(to bottom, #4CAF50 0%, #8BC34A 100%)',
              borderRadius: '8px',
              position: 'relative'
            }}>
              {/* Visualization of single request */}
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '50%'
              }} />
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: '#4CAF50',
                fontWeight: 'bold'
              }}>
                1 Request
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPrebundlingExample; 