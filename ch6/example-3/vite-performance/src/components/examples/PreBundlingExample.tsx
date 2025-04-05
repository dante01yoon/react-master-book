import React, { useState } from 'react';
// Import individual functions from lodash-es
// Normally, each of these would trigger separate HTTP requests
// But with Vite's pre-bundling, they're bundled into a single request
import { debounce } from 'lodash-es';
import { chunk } from 'lodash-es';
import { sortBy } from 'lodash-es';
import { map } from 'lodash-es';
import { filter } from 'lodash-es';
import { reduce } from 'lodash-es';

/**
 * This component demonstrates how Vite's dependency pre-bundling works with 
 * libraries like lodash-es that have many internal modules.
 * 
 * Without pre-bundling, each imported function would trigger a separate HTTP request.
 * With Vite's pre-bundling, all functions are bundled into a single file.
 */
const PreBundlingExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [array] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [processedArray, setProcessedArray] = useState<number[]>([]);
  
  // Create a debounced function that updates state
  const handleInputChange = debounce((value: string) => {
    setDebouncedValue(value);
  }, 500);

  // Process the array using multiple lodash-es functions
  const processArray = () => {
    // First chunk the array into groups of 2
    const chunked = chunk(array, 2);
    
    // Map each chunk, multiply each number by 2
    const doubled = map(chunked, chunk => map(chunk, num => num * 2));
    
    // Flatten the array and filter even numbers
    const flat: number[] = reduce(doubled, (acc: number[], val: number[]) => [...acc, ...val], [] as number[]);
    const filtered = filter(flat, num => num % 4 === 0);
    
    // Sort the array in descending order
    const sorted = sortBy(filtered, num => -num);
    
    // Set the processed array
    setProcessedArray(sorted);
  };

  return (
    <div className="pre-bundling-example">
      <h2>Dependency Pre-bundling Example: lodash-es</h2>
      
      <div className="info-box" style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>How Vite's Pre-bundling Works</h3>
        <p>
          The Vite documentation explains:
        </p>
        <blockquote style={{ borderLeft: '4px solid #ccc', paddingLeft: '15px', margin: '15px 0' }}>
          "Some packages ship their ES modules builds as many separate files importing one another. 
          For example, lodash-es has over 600 internal modules! When we do import {'{'}debounce{'}'} from 'lodash-es', 
          the browser fires off 600+ HTTP requests at the same time! Even though the server has 
          no problem handling them, the large amount of requests create a network congestion 
          on the browser side, causing the page to load noticeably slower."
        </blockquote>
        <p>
          <strong>Without Vite:</strong> The imports at the top of this file would trigger 
          hundreds of HTTP requests.
        </p>
        <p>
          <strong>With Vite:</strong> All lodash-es functions are pre-bundled into a single file, 
          requiring just one HTTP request.
        </p>
        <p>
          Check your browser's Network tab to see that only one pre-bundled file containing 
          all lodash-es functions is loaded, not hundreds of individual files.
        </p>
      </div>
      
      <div className="example-section">
        <h3>Debounce Example:</h3>
        <p>Type in the input field to see debounced output (500ms delay):</p>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleInputChange(e.target.value);
          }}
          style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
        />
        <p>Debounced value: <strong>{debouncedValue}</strong></p>
      </div>
      
      <div className="example-section">
        <h3>Array Processing Example:</h3>
        <p>Using multiple lodash-es functions: chunk, map, filter, reduce, sortBy</p>
        <div>
          <p>Original array: [{array.join(', ')}]</p>
          <button 
            onClick={processArray}
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            Process Array
          </button>
          {processedArray.length > 0 && (
            <p>Processed array: [{processedArray.join(', ')}]</p>
          )}
        </div>
      </div>

      <div className="example-steps">
        <h3>How to Verify Pre-bundling:</h3>
        <ol>
          <li>Open your browser's DevTools (F12 or Ctrl+Shift+I)</li>
          <li>Go to the Network tab</li>
          <li>Look for a file that starts with <code>lodash-es</code> in the .vite/deps directory</li>
          <li>Notice that there's only one file being loaded, not hundreds of individual files</li>
        </ol>
      </div>
    </div>
  );
};

export default PreBundlingExample; 