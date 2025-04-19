/**
 * JSX와 변환된 JavaScript 코드 비교 스크립트
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

// 파일 경로 설정
const sourceFile = path.join(__dirname, '../src/example.jsx');
const outputFile = path.join(__dirname, '../dist/example.js');

// 원본 JSX 파일 읽기
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

// Babel을 사용한 변환 실행
const babelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  comments: true
};

const transformedCode = babel.transformSync(sourceCode, babelOptions).code;

// 결과 출력
console.log('\n=== 원본 JSX 코드 ===\n');
console.log(sourceCode);

console.log('\n=== Babel 변환 결과 ===\n');
console.log(transformedCode);

// 간단한 설명 추가
console.log('\n=== 변환 설명 ===\n');
console.log('1. JSX 문법은 React.createElement() 함수 호출로 변환되었습니다.');
console.log('2. 태그 이름은 첫 번째 인자로 전달됩니다 (HTML 태그는 문자열, 컴포넌트는 변수).');
console.log('3. props는 두 번째 인자로 객체 형태로 전달됩니다.');
console.log('4. 자식 요소들은 세 번째 이후의 인자로 전달됩니다.');
console.log('5. 중첩된 JSX는 중첩된 React.createElement() 호출로 변환됩니다.');
console.log('6. 조건부 렌더링과 같은 JavaScript 표현식은 유지됩니다.\n');

// 변환된 코드를 파일에 저장
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}
fs.writeFileSync(outputFile, transformedCode);

console.log(`변환된 코드가 ${outputFile}에 저장되었습니다.`); 