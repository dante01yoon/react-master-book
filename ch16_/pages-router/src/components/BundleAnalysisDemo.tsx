import React, { useState } from 'react';
// import { connectToDatabase } from '@/lib/db'; // ⚠️ 실험용: 이 주석을 해제하면 DB 코드가 번들에 포함됨

interface BundleAnalysisDemoProps {
  serverData?: string;
}

/**
 * 번들 분석 실험을 위한 데모 컴포넌트
 * 
 * 이 컴포넌트는 서버 코드가 클라이언트 번들에 포함되는지 확인하는 실험용 컴포넌트
 */
const BundleAnalysisDemo: React.FC<BundleAnalysisDemoProps> = ({ serverData }) => {
  const [showDetails, setShowDetails] = useState(false);

  // ⚠️ 실험용 코드 - 주석을 해제하면 번들에 서버 코드가 포함됨
  const handleDatabaseTest = () => {
    // const db = connectToDatabase();
    // console.log('[CLIENT] 클라이언트에서 DB 연결 시도:', db);
    console.log('[CLIENT] DB 연결 코드는 주석 처리됨');
    alert('콘솔을 확인하세요!');
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px 0',
      border: '2px solid #007acc',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <h2>🔬 번들 분석 실험 컴포넌트</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>현재 상태</h3>
        <ul>
          <li>✅ 서버 데이터: {serverData || '없음'}</li>
          <li>🚫 클라이언트에서 DB 코드 직접 참조: 주석 처리됨</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {showDetails ? '실험 가이드 숨기기' : '실험 가이드 보기'}
        </button>

        <button 
          onClick={handleDatabaseTest}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          DB 연결 테스트 (클라이언트)
        </button>
      </div>

      {showDetails && (
        <div style={{ 
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px'
        }}>
          <h4>📋 실험 단계</h4>
          <ol>
            <li>
              <strong>1단계:</strong> 현재 상태에서 <code>pnpm build:analyze</code> 실행
              <br />
              → <code>lib/db.ts</code>가 클라이언트 번들에 포함되지 않음을 확인
            </li>
            <li>
              <strong>2단계:</strong> 파일 상단의 import 주석 해제
              <br />
              <code>import {`{connectToDatabase}`} from '@/lib/db';</code>
            </li>
            <li>
              <strong>3단계:</strong> <code>handleDatabaseTest</code> 함수 내부의 주석 해제
              <br />
              <code>const db = connectToDatabase();</code>
            </li>
            <li>
              <strong>4단계:</strong> 다시 <code>pnpm build:analyze</code> 실행
              <br />
              → <code>lib/db.ts</code>가 클라이언트 번들에 포함됨을 확인
            </li>
            <li>
              <strong>5단계:</strong> 브라우저 개발자 도구 Sources 탭에서 번들 내용 확인
            </li>
          </ol>

          <div style={{ 
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px'
          }}>
            <strong>⚠️ 주의:</strong> 실험 완료 후에는 반드시 주석을 다시 처리하여 
            서버 코드가 클라이언트 번들에 포함되지 않도록 해야 합니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default BundleAnalysisDemo; 