// 여러 개의 루트 요소는 허용되지 않음
// function MultipleRootElements() {
//   return (
//     <h1>Hello, Reader!</h1>
//     <p>This is not allowed.</p>
//   );
// }

// 하나의 루트 요소만 허용됨
function SingleRootElement() {
  return (
    <div>
      <h1>Hello, Reader!</h1>
      <p>This is allowed.</p>
    </div>
  );
}

// 하나의 루트 요소만 허용됨 - React.Fragment 사용
// function SingleRootElement() {
//   return (
//     <>
//       <h1>Hello, Reader!</h1>
//       <p>This is allowed.</p>
//     </>
//   );
// }

export default SingleRootElement;
