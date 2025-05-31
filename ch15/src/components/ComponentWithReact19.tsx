function ComponentWithReact19({ product }) {
  return (
    <div>
       {/* ➊ 컴포넌트 내부에 선언된 메타 데이터 */}
        <title>{product.name} - 리액트 19</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <link rel="canonical" href={`https://../products/${product.id}`} />
      <h1>{product.name}</h1>
      {/* .. */}
      <link rel="stylesheet" href="/style-first.css" precedence="foo" />
      <link rel="stylesheet" href="/style-third.css" precedence="bar" />
      <link rel="stylesheet" href="/style-second.css" precedence="foo" />
      {/* precedence가 없는 속성은 무시됨 */}
      <link rel="stylesheet" href="/style-wrong.css" />
    </div>
  );
 }

export default ComponentWithReact19;
 