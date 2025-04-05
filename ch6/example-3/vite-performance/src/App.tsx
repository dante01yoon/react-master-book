import { useState } from 'react'
import './App.css'
import DependencyExample from './components/examples/DependencyExample'
import LazyLoadExample from './components/examples/LazyLoadExample'
import DynamicImportExample from './components/examples/DynamicImportExample'
import PreBundlingExample from './components/examples/PreBundlingExample'

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
      case 'lodash-prebundling':
        return <PreBundlingExample />
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
          className={activeTab === 'lodash-prebundling' ? 'active' : ''} 
          onClick={() => setActiveTab('lodash-prebundling')}
        >
          Lodash-ES Prebundling
        </button>
        <button 
          className={activeTab === 'dependency-prebundling' ? 'active' : ''} 
          onClick={() => setActiveTab('dependency-prebundling')}
        >
          Dependency Pre-bundling
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
