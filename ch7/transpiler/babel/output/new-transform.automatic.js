"use strict";

// react/jsx-runtime에서 jsx, jsxs 함수를 자동으로 임포트함
var _jsxRuntime = require("react/jsx-runtime");
// 새로운 JSX 변환(React 17+) 예제
// 이 파일은 React를 import하지 않아도 됩니다

// 간단한 JSX 예제 
var element = /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
  className: "welcome",
  children: "Hello, New JSX Transform!"
});

// 중첩된 JSX 예제
var nestedElement = /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  className: "container",
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
    className: "title",
    children: "React 17+ JSX \uBCC0\uD658"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
    className: "content",
    children: "React 17\uBD80\uD130\uB294 JSX\uB97C \uC704\uD574 React\uB97C import\uD560 \uD544\uC694\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    onClick: function onClick() {
      return console.log('클릭됨!');
    },
    children: "\uD074\uB9AD\uD574\uBCF4\uC138\uC694"
  })]
});

// 기능적으로는 동일하지만, import React가 필요하지 않음
console.log('새로운 JSX 변환 예제 파일이 로드되었습니다.');