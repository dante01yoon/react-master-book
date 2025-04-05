import React, { useState } from 'react';

/**
 * This component demonstrates Vite's on-demand transpilation using dynamic imports.
 * Modules are only loaded when the button is clicked, not during initial page load.
 */
const DynamicImportExample = () => {
  const [results, setResults] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleLoadModule = async (moduleName: string) => {
    setLoading(true);
    setSelectedModule(moduleName);
    
    try {
      let result: Record<string, unknown>;
      
      // Dynamic import - Vite only transpiles these modules when requested
      if (moduleName === 'math') {
        const mathModule = await import('./dynamic/math');
        result = {
          add: mathModule.add(5, 3),
          subtract: mathModule.subtract(10, 4),
          multiply: mathModule.multiply(6, 7),
          divide: mathModule.divide(20, 5)
        };
      } else if (moduleName === 'formatter') {
        const formatterModule = await import('./dynamic/formatter');
        result = {
          capitalized: formatterModule.capitalize('hello world'),
          reversed: formatterModule.reverse('javascript'),
          slugified: formatterModule.slugify('This is a Test String')
        };
      } else if (moduleName === 'utils') {
        const utilsModule = await import('./dynamic/utils');
        result = {
          randomNumber: utilsModule.generateRandomNumber(1, 100),
          uuid: utilsModule.generateUUID(),
          timestamp: utilsModule.getCurrentTimestamp()
        };
      } else {
        result = { error: 'Unknown module' };
      }
      
      setResults(result);
    } catch (error) {
      console.error('Error loading module:', error);
      setResults({ error: 'Failed to load module' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dynamic-import-example">
      <h2>Dynamic Import Example</h2>
      <p>
        This example demonstrates Vite's on-demand transpilation using dynamic imports.
        Click the buttons below to load different modules. Notice how each module is only
        loaded when you request it.
      </p>
      <p>
        Check the Network tab in your browser's DevTools to observe how JavaScript files
        are only loaded when you click on the buttons.
      </p>
      
      <div className="buttons" style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => handleLoadModule('math')}
          style={{ 
            padding: '8px 16px',
            backgroundColor: selectedModule === 'math' ? '#4CAF50' : '#ddd',
            color: selectedModule === 'math' ? 'white' : 'black',
            margin: '0 8px 8px 0',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Load Math Module
        </button>
        <button 
          onClick={() => handleLoadModule('formatter')}
          style={{ 
            padding: '8px 16px',
            backgroundColor: selectedModule === 'formatter' ? '#4CAF50' : '#ddd',
            color: selectedModule === 'formatter' ? 'white' : 'black',
            margin: '0 8px 8px 0',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Load Formatter Module
        </button>
        <button 
          onClick={() => handleLoadModule('utils')}
          style={{ 
            padding: '8px 16px',
            backgroundColor: selectedModule === 'utils' ? '#4CAF50' : '#ddd',
            color: selectedModule === 'utils' ? 'white' : 'black',
            margin: '0 8px 8px 0',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Load Utils Module
        </button>
      </div>
      
      <div 
        className="results" 
        style={{ 
          padding: '20px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px',
          minHeight: '150px'
        }}
      >
        {loading ? (
          <p>Loading module...</p>
        ) : results ? (
          <div>
            <h3>Module Results:</h3>
            <pre style={{ padding: '10px', backgroundColor: '#eee', borderRadius: '4px' }}>
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        ) : (
          <p>Click a button above to load a module</p>
        )}
      </div>
    </div>
  );
};

export default DynamicImportExample; 