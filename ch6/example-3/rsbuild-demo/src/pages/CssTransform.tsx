import React, { useState } from 'react';
import styles from './CssTransform.module.css';

// CSS 변환 시연 페이지 컴포넌트
const CssTransform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modern' | 'transformed'>('modern');
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">CSS 변환 데모</h1>
      
      <section className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Lightning CSS와 Browserslist</h2>
        <p className="text-muted-foreground mb-4">
          이 페이지는 RSBuild가 Lightning CSS와 Browserslist를 사용하여 모던 CSS를 
          오래된 브라우저에서도 작동하는 코드로 변환하는 방법을 보여줍니다.
        </p>
        
        <div className="mb-6">
          <div className="flex border-b border-border">
            <button
              className={`px-4 py-2 ${activeTab === 'modern' ? 
                'border-b-2 border-primary text-primary' : 
                'text-muted-foreground'}`}
              onClick={() => setActiveTab('modern')}
            >
              모던 CSS
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'transformed' ? 
                'border-b-2 border-primary text-primary' : 
                'text-muted-foreground'}`}
              onClick={() => setActiveTab('transformed')}
            >
              변환된 CSS
            </button>
          </div>
          
          <div className="mt-4">
            {activeTab === 'modern' ? (
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                {`.example {
  /* CSS 변수 사용 */
  color: var(--primary-color);
  
  /* CSS 중첩 사용 */
  & .nested {
    background: linear-gradient(to right, #4f46e5, #3b82f6);
    
    /* 최신 속성 */
    gap: 1rem;
    aspect-ratio: 1 / 1;
  }
  
  /* 최신 미디어 쿼리 문법 */
  @media (width >= 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}`}
              </pre>
            ) : (
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                {`.example {
  /* CSS 변수는 지원됨 */
  color: var(--primary-color);
}

/* 중첩은 별도 클래스로 풀림 */
.example .nested {
  background: linear-gradient(to right, #4f46e5, #3b82f6);
  gap: 1rem;
  aspect-ratio: 1 / 1;
}

/* 미디어 쿼리는 기존 문법으로 변환 */
@media (min-width: 768px) {
  .example {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}`}
              </pre>
            )}
          </div>
        </div>
      </section>
      
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">실제 적용 예시</h3>
          
          <div className={styles.container}>
            <div className={styles.card}>
              <h4 className={styles.title}>CSS 변수 사용</h4>
              <p className={styles.description}>
                Lightning CSS는 CSS 변수를 브라우저 호환성을 위해 관리합니다.
              </p>
            </div>
            
            <div className={styles.card}>
              <h4 className={styles.title}>중첩 문법</h4>
              <p className={styles.description}>
                <span className={styles.highlight}>중첩된 선택자</span>는 
                자동으로 표준 CSS로 변환됩니다.
              </p>
            </div>
            
            <div className={styles.grid}>
              <div className={styles.gridItem}>그리드 아이템 1</div>
              <div className={styles.gridItem}>그리드 아이템 2</div>
              <div className={styles.gridItem}>그리드 아이템 3</div>
              <div className={styles.gridItem}>그리드 아이템 4</div>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">주요 기능</h3>
          
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Lightning CSS:</strong> 매우 빠른 CSS 변환 엔진
            </li>
            <li>
              <strong>Browserslist:</strong> 타겟 브라우저 설정으로 필요한 변환만 수행
            </li>
            <li>
              <strong>CSS 모듈:</strong> 로컬 스코프 스타일로 스타일 충돌 방지
            </li>
            <li>
              <strong>자동 프리픽스:</strong> 브라우저별 프리픽스 자동 추가
            </li>
            <li>
              <strong>최신 문법 지원:</strong> CSS 중첩, 미디어 쿼리 범위 등 지원
            </li>
          </ul>
          
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">설정 방법</h4>
            <p className="text-sm text-muted-foreground mb-2">rsbuild.config.js에 추가:</p>
            <pre className="text-xs overflow-x-auto">
              {`bundlerChain: (chain, { CHAIN_ID }) => {
  chain.module
    .rule(CHAIN_ID.RULE.CSS)
    .use(CHAIN_ID.USE.POSTCSS)
    .tap(options => ({
      ...options,
      lightningcss: {
        targets: { browsers: 'browserslist' },
      },
    }));
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CssTransform; 