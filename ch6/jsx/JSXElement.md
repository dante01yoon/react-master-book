```JSX
<div className="container"> {/* ➊ */}  
  <h1>Hello, JSX!</h1>
  <MyComponent prop="value" /> {/* ➋ */}
</div>
<img src="logo.png" alt="Logo" /> {/* ➌ */} 
```


```JS
function Rd(e) {
 return nn.jsx("button", { // ➊
   className: e.className,
   onClick: e.onClick,
   children: e.children,
 });
}
function Od() {
  // ➋
 return nn.jsx(Rd, { children: "Golden Rabbit" });
}
```

```JS
function Rd() {
 // 난수가 아닌 문자열로 변환되어 HTML 기본 태그로 인식되는 customButton
 return En.jsx("customButton", { children: "Golden Rabbit" }); ➊ 
}
```