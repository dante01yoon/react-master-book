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
            <h1>Vite 성능 예제</h1>
            <p>
              이 애플리케이션은 Vite의 주요 성능 기능을 보여줍니다:
            </p>
            <ul>
              <li>
                <strong>의존성 사전 번들링</strong> - Vite는 esbuild를 사용하여 의존성을 사전 번들링합니다 (JavaScript 기반 번들러보다 10-100배 빠름)
              </li>
              <li>
                <strong>필요 시 변환</strong> - Vite는 브라우저에서 요청할 때만 파일을 변환합니다
              </li>
            </ul>
            <p>
              이러한 기능을 탐색하려면 탐색 메뉴에서 다양한 예제를 선택하세요.
              리소스가 어떻게 로드되는지 확인하려면 브라우저의 개발자 도구(네트워크 탭)를 열어보세요.
            </p>
          </div>
        )
      case 'pre-bundling-comparison':
        return (
          <div>
            <h2>사전 번들링 비교</h2>
            <p>Vite의 의존성 사전 번들링 유무에 따라 어떤 일이 발생하는지 비교해보세요:</p>
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
                사전 번들링 있음
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
                사전 번들링 없음
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
        return <div>탐색 메뉴에서 예제를 선택하세요</div>
    }
  }

  return (
    <div className="app">
      <nav className="nav">
        <button 
          className={activeTab === 'intro' ? 'active' : ''} 
          onClick={() => setActiveTab('intro')}
        >
          소개
        </button>
        <button 
          className={activeTab === 'pre-bundling-comparison' ? 'active' : ''} 
          onClick={() => setActiveTab('pre-bundling-comparison')}
        >
          사전 번들링 비교
        </button>
        <button 
          className={activeTab === 'lodash-prebundling' ? 'active' : ''} 
          onClick={() => setActiveTab('lodash-prebundling')}
        >
          사전 번들링 있음
        </button>
        <button 
          className={activeTab === 'no-prebundling' ? 'active' : ''} 
          onClick={() => setActiveTab('no-prebundling')}
        >
          사전 번들링 없음
        </button>
        <button 
          className={activeTab === 'dependency-prebundling' ? 'active' : ''} 
          onClick={() => setActiveTab('dependency-prebundling')}
        >
          기타 의존성
        </button>
        <button 
          className={activeTab === 'lazy-loading' ? 'active' : ''} 
          onClick={() => setActiveTab('lazy-loading')}
        >
          지연 로딩
        </button>
        <button 
          className={activeTab === 'dynamic-import' ? 'active' : ''} 
          onClick={() => setActiveTab('dynamic-import')}
        >
          동적 가져오기
        </button>
      </nav>
      <main className="content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
