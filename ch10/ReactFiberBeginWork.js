// 전역 변수 또는 스케줄러가 관리하는 상태
let nextUnitOfWork = null; // 다음으로 처리해야 할 파이버 단위 작업을 가리킴
let workInProgressRoot = null; // 현재 빌드 중인 전체 파이버 트리의 루트
let currentRoot = null; // 현재 화면에 렌더링된 파이버 트리의 루트

const frameYieldMs = 5; // 한 번의 작업 루프에 할당된 최대 실행 시간 (밀리초), 이후 제어권 양보
let deadline = 0; // 현재 작업 루프가 작업을 중단해야 하는 시간

// React 스케줄러에 의해 반복적으로 호출되는 메인 작업 루프
// (실제 React는 requestIdleCallback보다 정교한 MessageChannel 등을 사용한 자체 스케줄러 활용)
function workLoopConcurrent() {
  // 현재 작업 단위가 있고, 아직 양보할 시간이 아니라면 계속 작업
  while (nextUnitOfWork !== null && deadline - getCurrentTime() > 0) {
    // 현재 작업 단위(파이버)를 처리하고, 다음 작업할 파이버를 반환받음
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 루프 종료 후 상태 확인
  if (nextUnitOfWork !== null) {
    // 아직 처리할 작업 단위(nextUnitOfWork)가 남아있지만 시간이 다 되어 루프를 빠져나온 경우
    // 다음 기회에 이어서 작업하도록 스케줄러에 다시 요청
    scheduleCallback(workLoopConcurrent); // 스케줄러가 적절한 시점에 workLoopConcurrent를 다시 실행
  } else {
    // 모든 작업 단위(nextUnitOfWork가 null)를 완료한 경우
    // workInProgressRoot에 완성된 파이버 트리가 준비됨
    // 이제 이 트리를 실제 DOM에 반영하는 '커밋 단계'로 진행
    commitRoot(workInProgressRoot);
    currentRoot = workInProgressRoot; // 작업이 완료된 트리를 현재 트리로 설정
    workInProgressRoot = null; // 다음 작업을 위해 초기화
  }
}

// 개별 파이버 노드에 대한 작업을 수행하는 함수 (재귀적이지 않음)
function performUnitOfWork(unitOfWork) {
  // unitOfWork는 현재 처리 중인 파이버 노드임

  // 1. "beginWork" 단계: 현재 파이버에 대한 작업을 시작함
  //    - Class 컴포넌트라면 인스턴스를 만들거나 update하고 render()를 호출함
  //    - Function 컴포넌트라면 함수 자체를 호출함
  //    - HostComponent (DOM 요소)라면 해당 DOM 노드를 만들거나 업데이트할 준비를 함
  //    - 이 과정에서 자식 컴포넌트들이 엘리먼트로 반환되면, 이들을 위한 새로운 자식 파이버들을 생성하거나 기존 자식 파이버와 비교(reconcile)함
  //    - unitOfWork.child 포인터가 이 과정에서 설정됨
  const nextChild = beginWork(unitOfWork); // beginWork는 자식 파이버를 반환하거나 null을 반환

  if (nextChild === null) {
    // 자식이 없다면, 현재 파이버에 대한 "completeWork" 단계를 수행함
    // "completeWork"는 DOM 노드 생성, props 설정 등의 실제 작업을 수행하고,
    // 형제나 부모로 이동하여 다음 작업을 찾음
    return completeUnitOfWork(unitOfWork);
  } else {
    // 자식이 있다면, 다음 작업 단위는 이 자식 파이버임
    return nextChild;
  }
}

// "beginWork" 로직 (매우 간소화된 개념)
function beginWork(currentFiber) {
  // ... currentFiber의 타입(함수형, 클래스형, 호스트 등)에 따라 다른 작업 수행 ...
  // ... props를 비교하고, 컴포넌트를 실행하고, 자식 엘리먼트를 얻음 ...
  // ... 자식 엘리먼트를 바탕으로 자식 파이버(들)을 생성/업데이트하고 currentFiber.child에 연결 ...
  // console.log(`Beginning work for ${currentFiber.type}`);
  // 이 함수는 생성된 첫 번째 자식 파이버를 반환하거나, 자식이 없으면 null을 반환
  // 실제로는 reconcileChildren(currentFiber, newChildren) 같은 함수가 호출됨
  return currentFiber.child; // 예시: 이미 자식이 생성/연결되었다고 가정
}

// "completeUnitOfWork" 로직 (매우 간소화된 개념)
function completeUnitOfWork(unitOfWork) {
  // 현재 unitOfWork(파이버)에 대한 작업이 완료되었을 때 호출됨
  // (예: 모든 자식들이 처리되었을 때)
  let completedWork = unitOfWork;
  do {
    const returnFiber = completedWork.return; // 부모 파이버
    const siblingFiber = completedWork.sibling; // 형제 파이버

    // "completeWork" 단계:
    // - 이 파이버에 대한 실제 작업(예: DOM 노드 생성, 이펙트 리스트 구성)을 수행함
    // console.log(`Completing work for ${completedWork.type}`);

    if (siblingFiber !== null) {
      // 형제 파이버가 있다면, 다음 작업 단위는 이 형제임
      return siblingFiber;
    }
    // 형제가 없다면, 부모 파이버의 작업 완료를 시도함
    completedWork = returnFiber;
  } while (completedWork !== null);

  // 루트까지 모든 작업이 완료되면 null을 반환하여 workLoopConcurrent를 종료시킴
  return null;
}

// 스케줄러 및 시간 관리 함수 (간소화)
function scheduleCallback(callback) {
  // 실제 React 스케줄러는 MessageChannel, setTimeout 등을 사용하여
  // 브라우저가 유휴 상태일 때 또는 다음 프레임에 콜백을 실행함
  // 여기서는 간단히 setTimeout으로 모방함
  setTimeout(callback, 0); // 가능한 빨리 비동기적으로 실행
}

function getCurrentTime() {
  return performance.now();
}

// 업데이트 요청 진입점 (예: ReactDOM.render() 또는 setState() 호출 시 내부적으로 유사한 흐름 발생)
function scheduleUpdate(rootFiber, update) {
  // ... 업데이트에 우선순위(lane)를 할당하는 로직 ...

  if (workInProgressRoot === null) {
    // 현재 다른 렌더링 작업이 없다면 새로운 작업 시작
    workInProgressRoot = rootFiber; // 작업할 트리의 루트를 설정
    nextUnitOfWork = rootFiber;    // 첫 번째 작업 단위를 루트 파이버로 설정
    
    // 작업 루프 시작을 스케줄링
    deadline = getCurrentTime() + frameYieldMs; // 이번 작업 시간 제한 설정
    scheduleCallback(workLoopConcurrent);
    console.log("Scheduled new concurrent work loop");
  } else {
    // 이미 진행 중인 작업이 있다면, 해당 작업에 업데이트를 병합하거나
    // 우선순위에 따라 현재 작업을 중단하고 새 작업을 시작할 수 있음 (매우 복잡한 로직)
    console.log("Work already in progress, update will be scheduled or merged.");
  }
}

// 최종적으로 DOM에 변경사항을 반영하는 함수 (매우 간소화)
function commitRoot(finishedWorkRoot) {
  // finishedWorkRoot.firstEffect 부터 시작하여 이펙트 리스트를 순회하며 DOM 변경
  console.log("Committing work to DOM:", finishedWorkRoot);
  // ... 실제 DOM 조작 (appendChild, removeChild, setAttribute 등) ...
}

// --- 예시 파이버 구조 (이해를 돕기 위함) ---
// function App() { return <div><p>Hello</p><span>World</span></div>; }
// 파이버 구조는 대략 다음과 같을 수 있습니다 (단순화):
// rootFiber (HostRoot)
//   -> AppFiber (FunctionComponent)
//     -> divFiber (HostComponent)
//       -> pFiber (HostComponent)
//       -> spanFiber (HostComponent, pFiber의 sibling)
// 각 파이버는 .child, .sibling, .return 포인터를 가집니다.