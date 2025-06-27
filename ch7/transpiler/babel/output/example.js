"use strict";

var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// JSX 원본 코드 (Babel 변환 전)

// 간단한 JSX 예제
var element = /*#__PURE__*/_react["default"].createElement("h1", {
  className: "welcome"
}, "Hello, JSX!");

// 중첩된 JSX 예제
var nestedElement = /*#__PURE__*/_react["default"].createElement("div", {
  className: "container"
}, /*#__PURE__*/_react["default"].createElement("h2", {
  className: "title"
}, "\uC911\uCCA9\uB41C JSX \uC608\uC81C"), /*#__PURE__*/_react["default"].createElement("p", {
  className: "content"
}, "JSX\uB294 \uC911\uCCA9 \uAD6C\uC870\uB97C \uC27D\uAC8C \uD45C\uD604\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/_react["default"].createElement("button", {
  onClick: function onClick() {
    return alert('클릭됨!');
  }
}, "\uD074\uB9AD\uD574\uBCF4\uC138\uC694"));

// 커스텀 컴포넌트 예제
var MyButton = function MyButton(_ref) {
  var color = _ref.color,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("button", {
    style: {
      backgroundColor: color,
      color: 'white',
      padding: '10px'
    }
  }, children);
};
var customComponentExample = /*#__PURE__*/_react["default"].createElement(MyButton, {
  color: "blue"
}, "Click Me");

// 조건부 렌더링 예제
var showMessage = true;
var conditionalExample = /*#__PURE__*/_react["default"].createElement("div", null, showMessage ? /*#__PURE__*/_react["default"].createElement("p", null, "\uBA54\uC2DC\uC9C0\uAC00 \uD45C\uC2DC\uB429\uB2C8\uB2E4.") : /*#__PURE__*/_react["default"].createElement("p", null, "\uBA54\uC2DC\uC9C0\uAC00 \uC228\uACA8\uC9D1\uB2C8\uB2E4."));
console.log('JSX 예제 파일이 로드되었습니다.');