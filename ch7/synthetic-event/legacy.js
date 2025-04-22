// 이벤트 리스너 기능 감지 및 할당 예제
var addEvent = function(element, event, handler) {
  if (element.addEventListener) {
    element.addEventListener(event, handler, false);
  } else if (element.attachEvent) { // IE 지원
    element.attachEvent('on' + event, handler);
  } else { // 매우 구형 브라우저의 경우
    element['on' + event] = handler;
  }
};

// 사용 예시
addEvent(window, 'load', function() {
  console.log('페이지가 로드되었습니다.');
});