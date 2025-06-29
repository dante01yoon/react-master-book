function commitUpdate(
  domElement,      // 업데이트할 실제 DOM 노드 (fiber.stateNode)
  updatePayload,   // ➊ 적용할 속성 변경 목록
  type,
  oldProps,
  newProps,
  internalInstanceHandle,
) {
  // ➋ 변경 목록을 순회하며 실제 DOM 속성을 업데이트
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];

    if (propKey === 'style') {
      // style 객체를 비교하여 변경된 부분만 적용
      updateStyle(domElement, propValue);
    } else if (propKey === 'className') {
      domElement.className = propValue;
    } else if (propKey === 'children') {
      // 텍스트 자식 노드 업데이트
      domElement.textContent = propValue;
    } else {
      // 기타 속성 업데이트 (setAttribute 등)
      domElement.setAttribute(propKey, propValue);
    }
  }
}