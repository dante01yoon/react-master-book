```JSX
<div className="container"> {/* ➊ */}  
  <h1>Hello, JSX!</h1>
  <MyComponent prop="value" /> {/* ➋ */}
</div>
<img src="logo.png" alt="Logo" /> {/* ➌ */} 
```


```JS
function Button () {
   return (
       <div>
        Golden Rabbit
       </div>
   )
}

function Button(e) {
 return nn.jsx("button", { // ➊
   className: e.className,
   onClick: e.onClick,
   children: e.children,
 });
}
function Od() {
 return nn.jsx(Button, { children: "Golden Rabbit" });
}
```

<!-- 커스텀 컴포넌트를 올바르게 대문자로 명명한 모습 -->
```JS
function Button2 () { // 트랜스파일링 전
   return (
       <Button>
        Golden Rabbit
       </Button>
   )
}


function Button2() { // 트랜스파일링 후
  // 문자열이 아닌 커스텀 컴포넌트인 Button이 첫 번째 인수가 된 모습
  return En.jsx(Button, { children: "Golden Rabbit" }); 
}
```

<!-- 커스텀 컴포넌트를 올바르지 않게 소문자로 명명한 모습 -->
```JS
function Button2 () {
    return (
        <customButton>
         Golden Rabbit
        </customButton>
    )
}

function Button2() {
 // 난수가 아닌 문자열로 변환되어 HTML 기본 태그로 인식되는 customButton
 return En.jsx("customButton", { children: "Golden Rabbit" });  
}
```
