import React, { useState } from 'react';

/**
 * 이 컴포넌트는 동적 임포트를 사용하여 Vite의 필요 시 변환을 보여줍니다.
 * 모듈은 초기 페이지 로드 시가 아니라 버튼을 클릭할 때만 로드됩니다.
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
      
      // 동적 임포트 - Vite는 요청 시에만 이러한 모듈들을 변환합니다
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
        result = { error: '알 수 없는 모듈' };
      }
      
      setResults(result);
    } catch (error) {
      console.error('모듈 로딩 오류:', error);
      setResults({ error: '모듈 로드 실패' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dynamic-import-example">
      <h2>동적 임포트 예제</h2>
      <p>
        이 예제는 동적 임포트를 사용하여 Vite의 필요 시 변환을 보여줍니다.
        아래 버튼을 클릭하여 다양한 모듈을 로드해보세요. 각 모듈이 요청할 때만
        로드되는 것을 확인하세요.
      </p>
      <p>
        브라우저의 개발자 도구 네트워크 탭에서 JavaScript 파일이 
        버튼을 클릭할 때만 로드되는 것을 관찰해보세요.
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
          수학 모듈 로드
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
          포맷터 모듈 로드
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
          유틸 모듈 로드
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
          <p>모듈 로딩 중...</p>
        ) : results ? (
          <div>
            <h3>모듈 결과:</h3>
            <pre style={{ padding: '10px', backgroundColor: '#eee', borderRadius: '4px' }}>
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        ) : (
          <p>모듈을 로드하려면 위의 버튼을 클릭하세요</p>
        )}
      </div>
    </div>
  );
};

export default DynamicImportExample; 