class FiberNode {
  constructor() {
    // --- 인스턴스 정보 ---
    this.tag = null;              // 워크_태그, 예: FunctionComponent, HostComponent 등 파이버의 종류
    this.key = null;              // 문자열_또는_null, 엘리먼트의 고유 key
    this.elementType = null;      // 원본_타입, React.createElement에 전달된 초기 타입 (예: MyComponent 함수)
    this.type = null;             // 실제_타입, 해석된 타입 (예: ForwardRef의 render 함수)
    this.stateNode = null;        // 실제_인스턴스, DOM 노드, 클래스 컴포넌트 인스턴스 등

    // --- 파이버 트리 구조 ---
    this.return = null;           // 부모_파이버_객체, 부모 파이버를 가리킴
    this.child = null;            // 첫번째_자식_파이버_객체, 첫 번째 자식 파이버를 가리킴
    this.sibling = null;          // 다음_형제_파이버_객체, 다음 형제 파이버를 가리킴
    this.index = 0;               // 숫자, 형제 중 자신의 순서

    // --- 데이터 및 상태 ---
    this.pendingProps = null;     // 객체, 새로 들어온, 아직 처리 안 된 props
    this.memoizedProps = null;    // 객체, 이전에 사용했던 props
    this.updateQueue = null;      // 업데이트_큐_객체, 상태 업데이트, 콜백 등을 담는 큐
    this.memoizedState = null;    // 객체_또는_값, 이전에 사용했던 상태 (훅의 경우 훅 리스트)
    this.dependencies = null;     // 의존성_정보_객체, Context API 의존성

    // --- 모드 및 스케줄링 ---
    this.mode = 0;                // 작동_모드_플래그, Concurrent Mode, Strict Mode 등
    this.lanes = 0;               // 레인_비트마스크, 이 파이버에 예약된 작업의 우선순위
    this.childLanes = 0;          // 자식들 중 가장 높은 작업 우선순위

    // --- 부수 효과 (Effects) ---
    this.flags = 0;               // 이펙트_플래그, 이 파이버에 수행할 DOM 변경 등의 작업 종류 (Placement, Update, Deletion)
    this.subtreeFlags = 0;        // 이펙트_플래그, 이 파이버와 그 자손들 중 수행할 작업이 있는지 나타내는 플래그
    this.deletions = null;        // [삭제될_자식_파이버_객체들], 삭제할 자식 파이버 목록

    // --- 더블 버퍼링 ---
    this.alternate = null;        // 다른_버퍼의_파이버_객체, current 파이버 또는 work-in-progress 파이버
  }
}

function ParentComponent() {
  return (
    <div>
      <ChildComponentA />
      <ChildComponentB />
      <ChildComponentC />
    </div>
  );
}
