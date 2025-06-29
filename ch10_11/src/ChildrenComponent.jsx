// children prop을 받아 렌더링하는 컴포넌트 정의함.
function ChildrenComponent({children}) {
  return (
    <>
      <div>children을 통한 합성</div>
      {/* 외부에서 이미 생성된 children 엘리먼트를 전달받아 렌더링만 함 */}
      {children}
    </>
  )
}