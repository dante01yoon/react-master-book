function updateSimpleMemoComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes,
) {
  // ... (함수 시작 및 초기 검사) ...
  if (current !== null) {
    const prevProps = current.memoizedProps; // 이전 props 가져오기
    // Compare new props with previous props
    // ==============================================================
    // =====> 실제 얕은 비교가 일어나는 부분 <=====
    // ==============================================================
    // shared/shallowEqual.js 에 정의된 shallowEqual 함수를 사용
    if (shallowEqual(prevProps, nextProps) && // *** shallowEqual 호출! ***
        current.ref === workInProgress.ref &&
        workInProgress.type === current.type // Assume same type is sufficient for memo
      ) {
      didReceiveUpdate = false;
      workInProgress.pendingProps = nextProps;
      // 다른 업데이트(context 변경 등)가 없는지 추가 확인
      if (!checkScheduledUpdateOrContext(current, renderLanes)) {
        // 변경 없음 & 다른 업데이트 없음 -> Bailout!
        workInProgress.lanes = current.lanes;
        return bailoutOnAlreadyFinishedWork(
          current,
          workInProgress,
          renderLanes,
        );
      }
      // ... (강제 업데이트 처리) ...
    }
  }

  return updateFunctionComponent(
    current,
    workInProgress,
    Component,
    nextProps,
    renderLanes,
  );
}

function shallowCompare(objA, objB) {
  // 동일 참조 또는 동일 원시값 확인 (가장 빠른 비교)
  // (JavaScript의 Object.is 와 유사한 동작)
  if (objA === objB || (objA !== objA && objB !== objB)) { // NaN 처리 포함
    return true; // 참조가 같거나 원시값이 같으면 동일
  }

  // 둘 중 하나라도 객체/배열이 아니거나 null이면 다른 것
  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  // 객체/배열의 키(속성) 목록 가져오기
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 키의 개수 비교
  if (keysA.length !== keysB.length) {
    return false; // 키 개수가 다르면 다른 객체
  }

  // 각 키에 대해 값 비교 (주의: 값 자체의 참조만 비교!)
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    // objB에 해당 key가 없거나,
    // 해당 key에 대한 값의 참조(또는 원시값)가 다르면 false
    // (값 자체가 객체나 배열일 경우, 그 내부까지 비교하지 않음!)
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
       // (실제로는 원시값 비교를 위해 Object.is 사용 권장)
       return false;
    }
  }

  // 모든 키의 값이 얕게 비교했을 때 동일하면 true
  return true;
}