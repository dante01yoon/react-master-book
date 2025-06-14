import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/db';
import BundleAnalysisDemo from '@/components/BundleAnalysisDemo';

interface HomePageProps {
  serverTimestamp: string;
  userCount: number;
}

/**
 * 번들 분석 실험을 위한 메인 페이지
 * 
 * 이 페이지는 서버 사이드 렌더링을 통해 데이터를 가져오고,
 * 번들 분석 실험을 위한 데모 컴포넌트를 포함
 */
const HomePage: NextPage<HomePageProps> = ({ serverTimestamp, userCount }) => {
  return (
    <>
      <Head>
        <title>Next.js 번들 분석 실험</title>
        <meta name="description" content="@next/bundle-analyzer를 사용한 번들 분석 실험" />
      </Head>

      <div style={{ 
        padding: '40px', 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            color: '#333', 
            fontSize: '2.5rem',
            marginBottom: '10px'
          }}>
            📊 Next.js 번들 분석 실험
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '1.1rem',
            marginBottom: '20px'
          }}>
            @next/bundle-analyzer를 사용하여 서버/클라이언트 코드 분리 확인
          </p>
          
          <div style={{
            padding: '15px',
            backgroundColor: '#e3f2fd',
            border: '1px solid #2196f3',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <strong>서버에서 생성된 데이터:</strong>
            <br />
            <code>생성 시간: {serverTimestamp}</code>
            <br />
            <code>사용자 수: {userCount}명</code>
          </div>
        </header>

        <main>
          {/* 번들 분석 데모 컴포넌트 */}
          <BundleAnalysisDemo serverData={`서버 타임스탬프: ${serverTimestamp}`} />

          {/* 사용자 페이지 링크 섹션 */}
          <section style={{
            padding: '30px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginTop: '30px'
          }}>
            <h2>👥 사용자 페이지 테스트</h2>
            <p>다음 링크들을 클릭하여 사용자 상세 페이지에서도 번들 분석을 확인해보세요:</p>
            
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              {[1, 2, 3].map(id => (
                <Link
                  key={id}
                  href={`/users/${id}`}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                >
                  사용자 {id} 보기
                </Link>
              ))}
              
              <Link
                href="/users/999"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ff9800',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold'
                }}
              >
                존재하지 않는 사용자 (404 테스트)
              </Link>
            </div>
          </section>

          {/* 번들 분석 실행 가이드 */}
          <section style={{
            padding: '30px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            marginTop: '30px'
          }}>
            <h2>🚀 번들 분석 실행하기</h2>
            <div style={{ marginBottom: '20px' }}>
              <h3>1. 기본 상태 분석</h3>
              <pre style={{
                backgroundColor: '#2d3748',
                color: '#e2e8f0',
                padding: '15px',
                borderRadius: '6px',
                overflow: 'auto'
              }}>
                <code>pnpm build:analyze</code>
              </pre>
              <p>현재 상태에서는 <code>lib/db.ts</code> 코드가 클라이언트 번들에 포함되지 않습니다.</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3>2. 클라이언트 코드에 서버 모듈 포함시키기</h3>
              <p>다음 파일들에서 주석을 해제하세요:</p>
              <ul>
                <li><code>src/components/BundleAnalysisDemo.tsx</code> - import 주석 해제</li>
                <li><code>src/pages/users/[id].tsx</code> - 컴포넌트 내부 DB 호출 주석 해제</li>
              </ul>
              <p>그 후 다시 <code>pnpm build:analyze</code>를 실행하여 차이점을 확인하세요.</p>
            </div>

            <div style={{
              padding: '15px',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              borderRadius: '6px'
            }}>
              <strong>⚠️ 중요:</strong> 실제 프로덕션에서는 서버 전용 코드가 클라이언트에 포함되지 않도록 주의해야 합니다.
              데이터베이스 연결 정보, API 키 등의 민감한 정보가 노출될 수 있습니다.
            </div>
          </section>
        </main>

        <footer style={{
          textAlign: 'center',
          marginTop: '60px',
          padding: '20px',
          borderTop: '1px solid #eee',
          color: '#666'
        }}>
          <p>Next.js 15 + React 19 + @next/bundle-analyzer</p>
          <p>서버/클라이언트 코드 분리 실험 프로젝트</p>
        </footer>
      </div>
    </>
  );
};

// 서버 사이드에서 실행되는 함수 - 이 코드는 클라이언트 번들에 포함되지 않음
export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    // 데이터베이스 연결 및 사용자 수 조회
    const db = await connectToDatabase();
    
    // 실제로는 db.collection('users').countDocuments() 같은 방식으로 조회
    // 여기서는 목 데이터의 길이를 반환
    const userCount = 3; // mockUsers.length와 동일
    
    // 서버에서 생성된 타임스탬프
    const serverTimestamp = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    console.log(`[SSR_HOME] 서버에서 데이터 생성: ${serverTimestamp}, 사용자 수: ${userCount}`);

    return {
      props: {
        serverTimestamp,
        userCount
      }
    };
  } catch (error) {
    console.error('[SSR_HOME] 서버 사이드 렌더링 중 오류:', error);
    
    // 에러가 발생해도 기본값으로 페이지 렌더링
    return {
      props: {
        serverTimestamp: new Date().toLocaleString('ko-KR'),
        userCount: 0
      }
    };
  }
};

export default HomePage;