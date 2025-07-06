// 개념적 예시: MyData 컴포넌트
function MyData() {
  const data = resource.read(); // resource는 Promise를 throw 할 수 있는 객체
  return <div>{data}</div>;
}

// 사용 예시
<Suspense fallback={<Spinner />}>
  <MyData />
</Suspense>