<!-- xlink 네임스페이스를 사용해 벡터 이미지를 jsx 내부에 잘못 작성 -->
<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
  <a xlink:href="https://goldenrabbit.co.kr/">
    <text x="10" y="25">Golden Rabbit</text>
  </a>
</svg>

<!-- 올바르게 작성 -->
<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
  <a xlinkHref="https://goldenrabbit.co.kr/">
    <text x="10" y="25">Golden Rabbit</text>
  </a>
</svg>

