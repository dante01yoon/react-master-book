function renderRoot(root, lanes) {
  do {
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      // ➊ 렌더링 수행 중 throw된 프로미스와 에러를 내부적으로 구분함
      handleThrow(root, thrownValue);
    }
  } while (true);
  // ... 생략 https://github.com/facebook/react/blob/v19.1.0/packages/react-reconciler/src/ReactFiberWorkLoop.js#L2426
 }
 