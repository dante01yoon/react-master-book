/**
 * 기존 JSX 변환과 새로운 JSX 변환(React 17+) 비교 스크립트
 */
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

// 소스 파일
const sourceFile = path.join(__dirname, '../src/new-transform.jsx');
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

// 기존 방식으로 변환 (React.createElement)
const classicOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  comments: true
};

// 새로운 방식으로 변환 (React 17+, JSX 자동 런타임)
const newOptions = {
  presets: [
    '@babel/preset-env', 
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  comments: true
};

// 각 방식으로 변환 실행
const classicCode = babel.transformSync(sourceCode, classicOptions).code;
const newCode = babel.transformSync(sourceCode, newOptions).code;

// 결과 출력
console.log('\n=== 원본 JSX 코드 ===\n');
console.log(sourceCode);

console.log('\n=== 기존 JSX 변환 결과 (classic runtime) ===\n');
console.log(classicCode);

console.log('\n=== 새로운 JSX 변환 결과 (automatic runtime, React 17+) ===\n');
console.log(newCode);

console.log('\n=== 두 변환 방식의 차이점 ===\n');
console.log('1. 기존 방식: React.createElement() 함수를 직접 호출합니다.');
console.log('   - JSX를 사용하려면 항상 import React from "react";가 필요합니다.');
console.log('2. 새로운 방식: react/jsx-runtime에서 가져온 함수를 사용합니다.');
console.log('   - JSX만 사용하는 파일에서 React를 명시적으로 import할 필요가 없습니다.');
console.log('   - 번들 크기가 약간 줄어들고 코드가 더 명확해집니다.');
console.log('   - React 17 이상에서만 지원됩니다.\n');

// 변환된 코드를 파일에 저장
const classicOutputFile = path.join(__dirname, '../dist/new-transform.classic.js');
const newOutputFile = path.join(__dirname, '../dist/new-transform.automatic.js');

if (!fs.existsSync(path.dirname(classicOutputFile))) {
  fs.mkdirSync(path.dirname(classicOutputFile), { recursive: true });
}

fs.writeFileSync(classicOutputFile, classicCode);
fs.writeFileSync(newOutputFile, newCode);

console.log(`기존 변환 결과가 ${classicOutputFile}에 저장되었습니다.`);
console.log(`새로운 변환 결과가 ${newOutputFile}에 저장되었습니다.`); 