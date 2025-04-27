function updateElement(returnFiber, current, element, lanes) {
  // 타입 비교 (및 키 비교)
  if (current !== null && current.elementType === element.type) {
    // 타입 일치 -> 기존 Fiber 재사용 결정
    const workInProgress = useFiber(current, element.props); // stateNode, ref 등 상속
    workInProgress.return = returnFiber;
    // ... 기타 설정 ...
    return workInProgress; // 재사용할 Fiber 반환
  } else {
    // 타입 불일치 -> 기존 Fiber 삭제하고 새로 생성 (createFiberFromElement 호출)
    // ...
  }
}

function useFiber(fiber, pendingProps) {
  const clone = createWorkInProgress(fiber, pendingProps);
  // clone은 fiber의 stateNode, ref, type 등을 물려받음
  clone.index = 0;
  clone.sibling = null;
  return clone;
}

function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {

  // 1. Context 준비 (Context API 값 읽기 준비)
  prepareToReadContext(workInProgress, renderLanes);

  let nextChildren;
  let hasScheduledUpdateOrContext = false; // 컴포넌트 자체 업데이트나 context 변경 여부

  // (DEV 환경) 개발 관련 유효성 검사 등 수행...
  validateFunctionComponentInDev(workInProgress, Component);

  // (최적화) 만약 이전 파이버가 있고, 업데이트가 없다면 Bailout 시도
  // (주의: React.memo 비교는 updateMemoComponent에서 이미 처리됨.
  //  여기서는 주로 context 변경이나 부모로부터의 강제 업데이트 등을 확인)
  if (current !== null) {
    hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current, renderLanes);
    if (!hasScheduledUpdateOrContext && (workInProgress.flags & DidCapture) === NoFlags) {
      // 특별한 업데이트가 없고, 이전에 에러/Suspense도 없었다면 Bailout 가능성 있음
      // (실제로는 Hooks 상태 변경 등 내부 요인도 고려되어 renderWithHooks에서 최종 결정됨)
      // 만약 여기서 Bailout 조건이 확실하다면 bailoutOnAlreadyFinishedWork 호출 가능
      // (실제 코드에서는 renderWithHooks 호출 후 결과 보고 Bailout 결정하는 경우가 많음)
    }
  }

  // 2. 컴포넌트 함수 실행 (Hooks 처리 포함)
  //    - renderWithHooks가 핵심! 이 안에서 useState, useEffect, useMemo 등 모든 Hook 실행
  //    - Component(nextProps, secondArg) 형태로 함수 호출
  nextChildren = renderWithHooks(
    current,            // 이전 파이버 (Hook 상태 복원 등에 사용)
    workInProgress,     // 현재 작업 중인 파이버
    Component,          // 실행할 함수 컴포넌트
    nextProps,          // 새로운 props
    null,               // context (레거시)
    renderLanes         // 현재 렌더링 레인
  );

  // (renderWithHooks 내부에서didReceiveUpdate 플래그가 설정될 수 있음 - Hooks 상태 변경 등)
  if (current !== null && !didReceiveUpdate && !hasScheduledUpdateOrContext) {
      // Hooks 상태 변경도 없고, 외부 업데이트 요인도 없다면 최종 Bailout
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  // 3. 컴포넌트 실행 결과(자식들) 재조정
  //    - renderWithHooks가 반환한 nextChildren과 이전 자식 파이버(current.child) 비교
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);

  // 4. 첫 번째 자식 파이버 반환 (다음 작업 대상)
  return workInProgress.child;
}



function updateHostComponent(current, workInProgress, renderLanes) {
  const oldProps = current.memoizedProps;
  const newProps = workInProgress.pendingProps;

  // Props 비교하여 차이점 계산
  const updatePayload = diffProperties(
    domElement, // workInProgress.stateNode
    workInProgress.type,
    oldProps,
    newProps,
    // ...
  );

  // 변경 사항이 있으면 updatePayload 저장 및 Update 플래그 설정
  if (updatePayload) {
    workInProgress.updateQueue = updatePayload;
    workInProgress.flags |= Update; // Update 플래그 추가!
  }

  // ... 자식 재조정 (reconcileChildren 호출) ...
  return workInProgress.child;
}

function commitUpdate(
  domElement, // fiber.stateNode
  updatePayload, // fiber.updateQueue
  type,
  oldProps,
  newProps,
  internalInstanceHandle,
) {
  // 1. updatePayload를 순회하며 실제 DOM 속성 업데이트
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];
    if (propKey === 'style') {
      // style 업데이트 로직
    } else if (propKey === 'className') {
      domElement.className = propValue;
    } else {
      // 기타 속성 업데이트 (setAttribute 등)
    }
  }
}


// 단일 자식 비교 의사코드 (reconcileSingleElement 로직 기반)
function reconcileSingleElement(returnFiber, currentFirstChild, newElement) {
  let oldFiber = currentFirstChild;

  // 이전 자식 파이버들을 순회하며 비교 시도
  while (oldFiber !== null) {
    // 1. Key 비교 (엘리먼트 key와 파이버 key)
    if (oldFiber.key === newElement.key) {
      // 2. Key 일치 시 Type 비교 (엘리먼트 type과 파이버 elementType)
      if (oldFiber.elementType === newElement.type) {
        // 3. Key와 Type 모두 일치 -> 재사용!
        //    남은 형제들은 불필요하므로 삭제 대상으로 표시
        deleteRemainingChildren(returnFiber, oldFiber.sibling);
        //    기존 파이버를 기반으로 workInProgress 파이버 생성 (stateNode 등 상속)
        const existing = useFiber(oldFiber, newElement.props);
        existing.return = returnFiber;
        //    재사용한 파이버 반환
        return existing;
      } else {
        // Key는 같지만 Type이 다름 -> 재사용 불가!
        // 현재 oldFiber 및 이후 모든 형제 삭제 대상으로 표시
        deleteRemainingChildren(returnFiber, oldFiber);
        // 비교 중단 (더 이상 일치 가능성 없음)
        break;
      }
    } else {
      // Key 불일치 -> 현재 oldFiber는 삭제 대상으로 표시
      deleteChild(returnFiber, oldFiber);
    }
    // 다음 형제 파이버로 이동하여 비교 계속
    oldFiber = oldFiber.sibling;
  }

  // 루프 종료 후: 일치하는 파이버를 찾지 못했거나, Type 불일치로 중단된 경우
  // 새로운 엘리먼트를 위한 새 파이버 생성
  const created = createFiberFromElement(newElement, returnFiber.mode, lanes);
  created.return = returnFiber;
  // 생성된 새 파이버 반환
  return created;
}

// 여러 자식 비교 의사코드 (reconcileChildrenArray 로직 기반)
function reconcileChildrenArray(returnFiber, currentFirstChild, newChildrenArray) {
  let resultingFirstChild = null; // 새로 만들어질 자식 파이버 리스트의 첫 번째
  let previousNewFiber = null;    // 리스트 연결을 위한 이전 파이버 포인터
  let oldFiber = currentFirstChild; // 비교 대상인 이전 자식 파이버
  let newIdx = 0;                   // 새 자식 배열의 현재 인덱스
  let lastPlacedIndex = 0;          // 이동(Move) 감지를 위한 이전 인덱스 추적

  // (간략화) 1단계: 앞에서부터 순서대로 비교하며 최대한 재사용
  // Key와 Type이 일치하는 동안 oldFiber와 newChildrenArray[newIdx]를 비교하며 재사용
  // ... (실제 코드는 더 복잡하지만, 기본 아이디어는 동일) ...

  // (간략화) 2단계: 남은 요소들 처리 (Key 기반 매칭)

  // 2a. 남은 기존 자식들을 Key를 키로 하는 Map으로 변환
  const existingChildrenMap = mapRemainingChildren(oldFiber);

  // 2b. 남은 새 자식 배열을 순회
  for (; newIdx < newChildrenArray.length; newIdx++) {
    const newChildElement = newChildrenArray[newIdx];
    const key = newChildElement.key !== null ? newChildElement.key : newIdx;
    let newFiber = null;

    // 2c. Map에서 Key로 기존 파이버 검색
    const matchedOldFiber = existingChildrenMap.get(key);

    if (matchedOldFiber !== undefined) {
      // Key 일치! -> Type 비교
      if (matchedOldFiber.elementType === newChildElement.type) {
        // Type까지 일치 -> 재사용!
        newFiber = useFiber(matchedOldFiber, newChildElement.props);
        // Map에서 제거 (처리 완료)
        existingChildrenMap.delete(key);

        // ** 이동(Move) 감지 **
        // 기존 위치(matchedOldFiber.index)가 마지막 배치 위치보다 작으면 이동 필요
        if (matchedOldFiber.index < lastPlacedIndex) {
          newFiber.flags |= Placement; // Placement 플래그 설정
        }
        lastPlacedIndex = Math.max(lastPlacedIndex, matchedOldFiber.index);

      } else {
        // Key는 같지만 Type이 다름 -> 재사용 불가!
        // 기존 파이버는 삭제, 새 파이버 생성
        deleteChild(returnFiber, matchedOldFiber);
        existingChildrenMap.delete(key); // Map에서도 제거
        newFiber = createFiber(newChildElement);
        newFiber.flags |= Placement; // 새로 생성 시 항상 Placement
      }
    } else {
      // Key 불일치 -> 새 파이버 생성
      newFiber = createFiber(newChildElement);
      newFiber.flags |= Placement; // 새로 생성 시 항상 Placement
    }

    // 새로 생성/재사용된 파이버를 리스트에 연결
    newFiber.return = returnFiber;
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  // 2d. Map에 아직 남아있는 기존 자식들은 더 이상 불필요 -> 모두 삭제
  existingChildrenMap.forEach(child => deleteChild(returnFiber, child));

  // 완성된 자식 파이버 리스트의 첫 번째 반환
  return resultingFirstChild;
}

// --- 보조 함수 의사코드 ---
function useFiber(fiber, pendingProps) {
  // 기존 파이버(fiber)를 기반으로 workInProgress 파이버를 복제/생성
  const clone = createWorkInProgress(fiber, pendingProps);
  // stateNode, ref, type 등 주요 속성 상속
  clone.index = 0;      // 형제 리스트 내 인덱스 초기화
  clone.sibling = null; // 형제 포인터 초기화
  return clone;
}

function createFiber(element) {
  // 주어진 React 엘리먼트로 새로운 파이버 객체 생성
  // ...
}

function deleteChild(returnFiber, childToDelete) {
  // 주어진 파이버(childToDelete)를 삭제 대상으로 표시
  // returnFiber.deletions 배열에 추가하고 ChildDeletion 플래그 설정
  // ...
}

function mapRemainingChildren(firstChild) {
  // 주어진 첫 번째 자식 파이버부터 형제들을 순회하며
  // Key(없으면 index)를 키로, 파이버를 값으로 하는 Map 생성하여 반환
  // ...
}

function reconcileChildrenArray(returnFiber, currentFirstChild, newChildrenArray) {
  // 1. 이전 자식들을 식별 정보(Key 또는 Index) 기반 Map으로 생성
  const oldFiberMap = mapOldFibersByIdentifier(currentFirstChild);

  let resultingFirstChild = null;
  let previousNewFiber = null;
  let lastPlacedIndex = -1; // 이동 감지용

  // 2. 새로운 자식 배열 순회
  for (let newIdx = 0; newIdx < newChildrenArray.length; newIdx++) {
    const newElement = newChildrenArray[newIdx];
    if (newElement === null) continue; // null은 건너뜀

    // 3. 새 엘리먼트의 식별 정보 결정 (Key 우선, 없으면 Index)
    const identifier = newElement.key !== null ? newElement.key : newIdx;

    // 4. 식별 정보(identifier)를 사용해 Map에서 이전 파이버 검색
    const matchedOldFiber = oldFiberMap.get(identifier);

    let newFiber;

    if (matchedOldFiber) {
      // 5a. 식별 정보 일치! -> Map에서 제거하고 Type 비교
      oldFiberMap.delete(identifier);
      if (matchedOldFiber.elementType === newElement.type) {
        // Type까지 일치 -> 재사용
        newFiber = useFiber(matchedOldFiber, newElement.props);
        // 이동 여부 판단 (기존 인덱스와 현재 배치 순서 비교)
        if (matchedOldFiber.index < lastPlacedIndex) {
          newFiber.flags |= Placement; // 이동 필요
        }
        lastPlacedIndex = Math.max(lastPlacedIndex, matchedOldFiber.index);
      } else {
        // Type 불일치 -> 기존 것 삭제, 새 것 생성
        deleteChild(returnFiber, matchedOldFiber);
        newFiber = createFiber(newElement);
        newFiber.flags |= Placement; // 생성은 항상 배치
      }
    } else {
      // 5b. 식별 정보 불일치 -> 새 파이버 생성
      newFiber = createFiber(newElement);
      newFiber.flags |= Placement; // 생성은 항상 배치
    }

    // 생성/재사용된 파이버 연결
    newFiber.return = returnFiber;
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  // 6. Map에 남은 이전 파이버들은 모두 삭제
  oldFiberMap.forEach(fiber => deleteChild(returnFiber, fiber));

  return resultingFirstChild;
}