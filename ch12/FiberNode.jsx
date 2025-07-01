// 리액트 파이버 노드의 핵심 속성을 간소화한 예시
class FiberNode {
  constructor(tag, pendingProps, key) {
    // --- 1. 기본 식별 정보 ---
    this.tag = tag;              // 파이버의 종류 (예: FunctionComponent, HostComponent)
    this.key = key;              // 엘리먼트의 고유 key
    this.elementType = null;     // React.createElement에 전달된 초기 타입 (예: App 함수)
    this.type = null;            // 실제 해석된 타입 (예: forwardRef의 render 함수)
    this.stateNode = null;       // 실제 DOM 노드 또는 클래스 컴포넌트 인스턴스

    // --- 2. 트리 탐색을 위한 포인터 ---
    this.return = null;          // 부모 파이버 (작업 완료 후 돌아갈 위치)
    this.child = null;           // 첫 번째 자식 파이버
    this.sibling = null;         // 다음 형제 파이버

    // --- 3. 작업 처리에 필요한 데이터 ---
    this.pendingProps = pendingProps; // 새로 들어온, 아직 처리 안 된 props
    this.memoizedProps = null;      // 이전 렌더링에서 사용했던 props
    this.updateQueue = null;      // 상태 업데이트, 콜백 등을 담는 큐
    this.memoizedState = null;    // 이전 렌더링에서 사용했던 상태

    // --- 4. 부수 효과 (Effects) 관련 정보 ---
    this.flags = 0;               // 이 파이버에 수행할 DOM 변경 작업 (Placement, Update 등)
    this.subtreeFlags = 0;        // 자식 트리에 수행할 작업이 있는지 나타내는 플래그
    this.deletions = null;        // 삭제될 자식 파이버 목록

    // --- 5. 더블 버퍼링을 위한 포인터 ---
    this.alternate = null;       // 다른 버퍼의 파이버 (current ↔ work-in-progress)
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
