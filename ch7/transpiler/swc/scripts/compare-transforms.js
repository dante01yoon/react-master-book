/**
 * SWC의 기존 JSX 변환과 새로운 JSX 변환(React 17+) 비교 스크립트
 */
const fs = require('fs');
const path = require('path');
const swc = require('@swc/core');

// 소스 파일
const sourceFile = path.join(__dirname, '../src/new-transform.jsx');
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

// 기존 방식으로 변환 (React.createElement)
const classicOptions = {
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

// 새로운 방식으로 변환 (React 17+, JSX 자동 런타임)
const automaticOptions = {
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx: true
    },
    transform: {
      react: {
        runtime: 'automatic',
        importSource: 'react'
      }
    },
    target: 'es2015'
  },
  module: {
    type: 'commonjs'
  }
};

// 변환 비교 실행
async function compareTransforms() {
  try {
    // 각 방식으로 변환 실행
    const classicResult = await swc.transform(sourceCode, classicOptions);
    const automaticResult = await swc.transform(sourceCode, automaticOptions);

    const classicCode = classicResult.code;
    const automaticCode = automaticResult.code;

    // 결과 출력
    console.log('\n=== 원본 JSX 코드 ===\n');
    console.log(sourceCode);

    console.log('\n=== SWC 기존 JSX 변환 결과 (classic runtime) ===\n');
    console.log(classicCode);

    console.log('\n=== SWC 새로운 JSX 변환 결과 (automatic runtime, React 17+) ===\n');
    console.log(automaticCode);

    console.log('\n=== 두 변환 방식의 차이점 ===\n');
    console.log('1. 기존 방식: React.createElement() 함수를 직접 호출합니다.');
    console.log('   - JSX를 사용하려면 항상 import React from "react";가 필요합니다.');
    console.log('2. 새로운 방식: jsx와 jsxs 함수를 사용합니다.');
    console.log('   - JSX만 사용하는 파일에서 React를 명시적으로 import할 필요가 없습니다.');
    console.log('   - 자동으로 react/jsx-runtime에서 필요한 함수를 import합니다.');
    console.log('   - 번들 크기가 약간 줄어들고 코드가 더 명확해집니다.');
    console.log('   - React 17 이상에서 지원되며 Next.js 등 최신 프레임워크에서 기본 설정입니다.\n');

    // 변환된 코드를 파일에 저장
    const classicOutputFile = path.join(__dirname, '../dist/new-transform.classic.js');
    const automaticOutputFile = path.join(__dirname, '../dist/new-transform.automatic.js');

    if (!fs.existsSync(path.dirname(classicOutputFile))) {
      fs.mkdirSync(path.dirname(classicOutputFile), { recursive: true });
    }

    fs.writeFileSync(classicOutputFile, classicCode);
    fs.writeFileSync(automaticOutputFile, automaticCode);

    console.log(`기존 변환 결과가 ${classicOutputFile}에 저장되었습니다.`);
    console.log(`새로운 변환 결과가 ${automaticOutputFile}에 저장되었습니다.`);
  } catch (error) {
    console.error('변환 중 오류 발생:', error);
  }
}

// 변환 비교 실행
compareTransforms(); 