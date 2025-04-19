/**
 * SWC JSX 변환 결과 비교 스크립트
 */
const fs = require('fs');
const path = require('path');
const swc = require('@swc/core');

// 파일 경로 설정
const sourceFile = path.join(__dirname, '../src/example.jsx');
const outputFile = path.join(__dirname, '../dist/example.js');

// 원본 JSX 파일 읽기
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

// SWC 옵션 설정 - Classic 런타임 (React.createElement)
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

// SWC를 사용한 변환 실행
async function compareTransform() {
  try {
    const transformedCode = await swc.transform(sourceCode, swcOptions);

    // 결과 출력
    console.log('\n=== 원본 JSX 코드 ===\n');
    console.log(sourceCode);

    console.log('\n=== SWC 변환 결과 (Classic 런타임) ===\n');
    console.log(transformedCode.code);

    // 간단한 설명 추가
    console.log('\n=== 변환 설명 ===\n');
    console.log('1. JSX 문법은 React.createElement() 함수 호출로 변환되었습니다.');
    console.log('2. SWC는 Babel과 동일한 형태로 JSX를 변환하지만 Rust로 작성되어 변환 속도가 훨씬 빠릅니다.');
    console.log('3. 태그 이름은 첫 번째 인자로 전달됩니다 (HTML 태그는 문자열, 컴포넌트는 변수).');
    console.log('4. props는 두 번째 인자로 객체 형태로 전달됩니다.');
    console.log('5. 자식 요소들은 세 번째 이후의 인자로 전달됩니다.');
    console.log('6. 중첩된 JSX는 중첩된 React.createElement() 호출로 변환됩니다.\n');

    // 변환된 코드를 파일에 저장
    if (!fs.existsSync(path.dirname(outputFile))) {
      fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    }
    fs.writeFileSync(outputFile, transformedCode.code);

    console.log(`변환된 코드가 ${outputFile}에 저장되었습니다.`);
  } catch (error) {
    console.error('변환 중 오류 발생:', error);
  }
}

// 변환 실행
compareTransform(); 