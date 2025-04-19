/**
 * esbuild를 사용하여 automatic 모드로 JSX를 변환하는 스크립트
 * automatic 모드에서는 JSX가 react/jsx-runtime의 함수 호출로 변환됩니다.
 */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

// 소스 파일 경로 (React import가 없는 파일)
const sourceFile = path.join(__dirname, '../src/AppNoReact.jsx');
// 출력 파일 경로
const outputFile = path.join(__dirname, '../dist/app-automatic.js');

// 원본 JSX 코드 읽기
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

// esbuild 변환 옵션 (automatic 모드)
const buildOptions = {
  // 진입점 파일 지정
  entryPoints: [sourceFile],
  // 번들링 결과물 저장 위치
  outfile: outputFile,
  // 번들러 실행 (false면 개별 파일만 변환)
  bundle: true,
  // 소스맵 생성 여부
  sourcemap: false,
  // 번들 포맷 (commonjs, esm 등)
  format: 'cjs',
  // minify 여부 (코드 압축)
  minify: false,
  // 브라우저 호환성을 위한 target
  target: 'es2015',
  // 자동 JSX 변환 모드 (React 17+)
  jsx: 'automatic',
  // 로그 레벨
  logLevel: 'info',
};

// esbuild로 JSX 변환 실행
async function transformJSX() {
  try {
    // esbuild API로 빌드 실행
    const result = await esbuild.build(buildOptions);
    
    console.log('\n=== esbuild 변환 완료 (automatic 모드) ===\n');
    console.log(`입력 파일: ${sourceFile}`);
    console.log(`출력 파일: ${outputFile}`);
    console.log('\n변환 방식: JSX → react/jsx-runtime 함수 호출');
    console.log('\n주요 특징:');
    console.log('- JSX 파일에 React를 import할 필요 없음');
    console.log('- React 17+의 새로운 JSX 변환 방식 사용');
    console.log('- 자동으로 react/jsx-runtime에서 필요한 함수를 import');
    console.log('- Babel/SWC의 automatic 런타임과 동일한 출력');
    
    // 원본 코드와 변환된 코드 출력 (선택적)
    if (process.argv.includes('--show-code')) {
      console.log('\n=== 원본 JSX 코드 ===\n');
      console.log(sourceCode);
      
      console.log('\n=== 변환된 코드 ===\n');
      console.log(fs.readFileSync(outputFile, 'utf8'));
    } else {
      console.log('\n코드를 확인하려면 --show-code 옵션을 추가하세요.');
      console.log(`예: node ${path.basename(__filename)} --show-code`);
    }
  } catch (error) {
    console.error('esbuild 변환 중 오류 발생:', error);
  }
}

// 변환 실행
transformJSX(); 