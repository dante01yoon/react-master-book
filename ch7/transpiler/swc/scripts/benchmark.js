/**
 * SWC와 Babel의 변환 속도 비교 벤치마크 스크립트
 * 
 * 이 스크립트는 SWC와 Babel의 JSX 변환 성능을 비교합니다.
 * 동일한 JSX 파일을 여러 번 변환하여 평균 변환 시간을 측정합니다.
 */
const fs = require('fs');
const path = require('path');
const swc = require('@swc/core');
let babel;
let babelPresetEnv;
let babelPresetReact;

// Babel이 설치되어 있는지 확인
try {
  babel = require('@babel/core');
  babelPresetEnv = require('@babel/preset-env');
  babelPresetReact = require('@babel/preset-react');
  console.log('Babel 패키지를 찾았습니다. 벤치마크를 실행합니다.');
} catch (error) {
  console.warn('주의: Babel 패키지를 찾을 수 없습니다. SWC만 벤치마크합니다.');
  console.warn('Babel 벤치마크를 위해서는 다음 명령어로 패키지를 설치하세요:');
  console.warn('npm install @babel/core @babel/preset-env @babel/preset-react');
}

// 소스 파일
const sourceFile = path.join(__dirname, '../src/example.jsx');
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

// SWC 옵션
const swcOptions = {
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
  },
  module: {
    type: 'commonjs'
  }
};

// Babel 옵션
const babelOptions = babel && {
  presets: [babelPresetEnv, babelPresetReact],
  comments: true
};

// 벤치마크 함수
async function runBenchmark(iterations = 100) {
  console.log(`\n=== SWC vs Babel 벤치마크 (${iterations}회 반복) ===\n`);
  
  // SWC 벤치마크
  const swcStartTime = process.hrtime.bigint();
  
  for (let i = 0; i < iterations; i++) {
    await swc.transform(sourceCode, swcOptions);
  }
  
  const swcEndTime = process.hrtime.bigint();
  const swcDuration = Number(swcEndTime - swcStartTime) / 1_000_000; // ms로 변환
  
  console.log(`SWC 변환 시간: ${swcDuration.toFixed(2)}ms (${iterations}회 평균: ${(swcDuration / iterations).toFixed(2)}ms)`);
  
  // Babel 벤치마크 (설치된 경우)
  if (babel) {
    const babelStartTime = process.hrtime.bigint();
    
    for (let i = 0; i < iterations; i++) {
      babel.transformSync(sourceCode, babelOptions);
    }
    
    const babelEndTime = process.hrtime.bigint();
    const babelDuration = Number(babelEndTime - babelStartTime) / 1_000_000; // ms로 변환
    
    console.log(`Babel 변환 시간: ${babelDuration.toFixed(2)}ms (${iterations}회 평균: ${(babelDuration / iterations).toFixed(2)}ms)`);
    
    // 속도 차이 분석
    const speedup = babelDuration / swcDuration;
    
    console.log(`\n=== 성능 비교 결과 ===\n`);
    console.log(`SWC는 Babel보다 약 ${speedup.toFixed(1)}배 빠릅니다.`);
    console.log('이는 SWC가 Rust로 작성되어 네이티브 코드로 컴파일되기 때문입니다.');
    console.log('대규모 프로젝트에서는 빌드 시간이 크게 단축될 수 있습니다.');
  }
}

// 벤치마크 실행
runBenchmark(100); 