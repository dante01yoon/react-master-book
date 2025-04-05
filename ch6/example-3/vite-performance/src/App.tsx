import { useState } from 'react'
import './App.css'
import DependencyExample from './components/examples/DependencyExample'
import LazyLoadExample from './components/examples/LazyLoadExample'
import DynamicImportExample from './components/examples/DynamicImportExample'
import PreBundlingExample from './components/examples/PreBundlingExample'
import NoPrebundlingExample from './components/examples/NoPrebundlingExample'

function App() {
  const [activeTab, setActiveTab] = useState<string>('intro')

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="intro">
            <h1>Vite Performance Examples</h1>
            <p>
              This application demonstrates key performance features of Vite:
            </p>
            <ul>
              <li>
                <strong>Dependency Pre-bundling</strong> - Vite pre-bundles dependencies using esbuild (10-100x faster than JavaScript-based bundlers)
              </li>
              <li>
                <strong>On-Demand Transpilation</strong> - Vite only transpiles files when they're requested by the browser
              </li>
            </ul>
            <p>
              Select different examples from the navigation menu to explore these features.
              Make sure to open your browser's DevTools (Network tab) to see how resources are loaded.
            </p>
          </div>
        )
      case 'pre-bundling-comparison':
        return (
          <div>
            <h2>Pre-bundling Comparison</h2>
            <p>Compare what happens with and without Vite's dependency pre-bundling:</p>
            <div className="prebundling-tabs" style={{ marginBottom: '20px' }}>
              <button
                onClick={() => document.getElementById('with-prebundling')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ 
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px 0 0 4px',
                  cursor: 'pointer'
                }}
              >
                With Pre-bundling
              </button>
              <button
                onClick={() => document.getElementById('without-prebundling')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ 
                  padding: '8px 16px',
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer'
                }}
              >
                Without Pre-bundling
              </button>
            </div>
            <div id="with-prebundling" style={{ marginBottom: '40px' }}>
              <PreBundlingExample />
            </div>
            <div id="without-prebundling">
              <NoPrebundlingExample />
            </div>
          </div>
        )
      case 'lodash-prebundling':
        return <PreBundlingExample />
      case 'no-prebundling':
        return <NoPrebundlingExample />
      case 'dependency-prebundling':
        return <DependencyExample />
      case 'lazy-loading':
        return <LazyLoadExample />
      case 'dynamic-import':
        return <DynamicImportExample />
      default:
        return <div>Select an example from the navigation menu</div>
    }
  }

  return (
    <div className="app">
      <nav className="nav">
        <button 
          className={activeTab === 'intro' ? 'active' : ''} 
          onClick={() => setActiveTab('intro')}
        >
          Introduction
        </button>
        <button 
          className={activeTab === 'pre-bundling-comparison' ? 'active' : ''} 
          onClick={() => setActiveTab('pre-bundling-comparison')}
        >
          Pre-bundling Comparison
        </button>
        <button 
          className={activeTab === 'lodash-prebundling' ? 'active' : ''} 
          onClick={() => setActiveTab('lodash-prebundling')}
        >
          With Pre-bundling
        </button>
        <button 
          className={activeTab === 'no-prebundling' ? 'active' : ''} 
          onClick={() => setActiveTab('no-prebundling')}
        >
          Without Pre-bundling
        </button>
        <button 
          className={activeTab === 'dependency-prebundling' ? 'active' : ''} 
          onClick={() => setActiveTab('dependency-prebundling')}
        >
          Other Dependencies
        </button>
        <button 
          className={activeTab === 'lazy-loading' ? 'active' : ''} 
          onClick={() => setActiveTab('lazy-loading')}
        >
          Lazy Loading
        </button>
        <button 
          className={activeTab === 'dynamic-import' ? 'active' : ''} 
          onClick={() => setActiveTab('dynamic-import')}
        >
          Dynamic Import
        </button>
      </nav>
      <main className="content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
