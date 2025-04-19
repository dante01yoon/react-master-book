/**
 * esbuild, SWC, Babel의 JSX 변환 성능 비교 벤치마크 스크립트
 *
 * 이 스크립트는 세 가지 도구의 JSX 변환 성능을 비교합니다.
 * 주의: SWC와 Babel이 설치되어 있지 않으면 해당 벤치마크는 건너뜁니다.
 */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

// 다른 라이브러리 조건부 로드
let swc, babel, babelPresetEnv, babelPresetReact;

// SWC 로드 시도
try {
  swc = require('@swc/core');
  console.log('SWC 패키지를 찾았습니다. 벤치마크에 포함됩니다.');
} catch (error) {
  console.warn('주의: SWC 패키지를 찾을 수 없습니다. SWC 벤치마크는 건너뜁니다.');
  console.warn('SWC 벤치마크를 위해서는 다음 명령어로 패키지를 설치하세요:');
  console.warn('npm install @swc/core');
}

// Babel 로드 시도
try {
  babel = require('@babel/core');
  babelPresetEnv = require('@babel/preset-env');
  babelPresetReact = require('@babel/preset-react');
  console.log('Babel 패키지를 찾았습니다. 벤치마크에 포함됩니다.');
} catch (error) {
  console.warn('주의: Babel 패키지를 찾을 수 없습니다. Babel 벤치마크는 건너뜁니다.');
  console.warn('Babel 벤치마크를 위해서는 다음 명령어로 패키지를 설치하세요:');
  console.warn('npm install @babel/core @babel/preset-env @babel/preset-react');
}

// 소스 파일
const sourceFile = path.join(__dirname, '../src/App.jsx');
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

// esbuild 옵션
const esbuildOptions = {
  // JSX 구문 활성화
  jsx: 'transform',
  // 로더 지정 (jsx)
  loader: 'jsx',
  // 대상 JS 버전
  target: 'es2015',
};

// SWC 옵션
const swcOptions = swc && {
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: true
    },
    transform: {
      react: {
        runtime: 'classic',
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment'
      }
    },
    target: 'es2015'
  }
};

// Babel 옵션
const babelOptions = babel && {
  presets: [babelPresetEnv, babelPresetReact],
  comments: true
};

// 벤치마크 함수
async function runBenchmark(iterations = 100) {
  console.log(`\n=== JSX 트랜스파일러 벤치마크 (${iterations}회 반복) ===\n`);
  
  // esbuild 벤치마크
  const esbuildStartTime = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    await esbuild.transform(sourceCode, esbuildOptions);
  }
  
  const esbuildEndTime = process.hrtime.bigint();
  const esbuildDuration = Number(esbuildEndTime - esbuildStartTime) / 1_000_000; // ms로 변환
  
  console.log(`esbuild 변환 시간: ${esbuildDuration.toFixed(2)}ms (${iterations}회 평균: ${(esbuildDuration / iterations).toFixed(3)}ms)`);
  
  // SWC 벤치마크 (설치된 경우)
  let swcDuration = 0;
  if (swc) {
    const swcStartTime = process.hrtime.bigint();
    
    for (let i = 0; i < iterations; i++) {
      await swc.transform(sourceCode, swcOptions);
    }
    
    const swcEndTime = process.hrtime.bigint();
    swcDuration = Number(swcEndTime - swcStartTime) / 1_000_000; // ms로 변환
    
    console.log(`SWC 변환 시간: ${swcDuration.toFixed(2)}ms (${iterations}회 평균: ${(swcDuration / iterations).toFixed(3)}ms)`);
  }
  
  // Babel 벤치마크 (설치된 경우)
  let babelDuration = 0;
  if (babel) {
    const babelStartTime = process.hrtime.bigint();
    
    for (let i = 0; i < iterations; i++) {
      babel.transformSync(sourceCode, babelOptions);
    }
    
    const babelEndTime = process.hrtime.bigint();
    babelDuration = Number(babelEndTime - babelStartTime) / 1_000_000; // ms로 변환
    
    console.log(`Babel 변환 시간: ${babelDuration.toFixed(2)}ms (${iterations}회 평균: ${(babelDuration / iterations).toFixed(3)}ms)`);
  }
  
  // 성능 비교 결과
  console.log('\n=== 성능 비교 결과 ===\n');
  
  if (swc) {
    const esbuildToSwc = esbuildDuration / swcDuration;
    console.log(`esbuild는 SWC보다 ${esbuildToSwc < 1 ? '약 ' + (1 / esbuildToSwc).toFixed(1) + '배 빠릅니다.' : '약 ' + esbuildToSwc.toFixed(1) + '배 느립니다.'}`);
  }
  
  if (babel) {
    const esbuildToBabel = esbuildDuration / babelDuration;
    console.log(`esbuild는 Babel보다 ${esbuildToBabel < 1 ? '약 ' + (1 / esbuildToBabel).toFixed(1) + '배 빠릅니다.' : '약 ' + esbuildToBabel.toFixed(1) + '배 느립니다.'}`);
  }
  
  if (swc && babel) {
    const swcToBabel = swcDuration / babelDuration;
    console.log(`SWC는 Babel보다 ${swcToBabel < 1 ? '약 ' + (1 / swcToBabel).toFixed(1) + '배 빠릅니다.' : '약 ' + swcToBabel.toFixed(1) + '배 느립니다.'}`);
  }
  
  console.log('\n성능 차이 이유:');
  console.log('- esbuild: Go 언어로 작성되어 네이티브 코드로 컴파일');
  console.log('- SWC: Rust 언어로 작성되어 네이티브 코드로 컴파일');
  console.log('- Babel: JavaScript로 작성되어 인터프리터로 실행');
  console.log('\n일반적으로 esbuild > SWC > Babel 순으로 빠르지만, 특정 기능 지원이나 유연성은 반대 순서일 수 있습니다.');
}

// 벤치마크 실행
runBenchmark(100); 