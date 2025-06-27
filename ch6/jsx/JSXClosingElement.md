```JSX
function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {/* ➊  */}
      {props.children ?? “Golden Rabbit”}
    </button>
  )
}

function Page() {
  return (
    // ➋ 
    <Button className=”primary” onClick={console.log} />
   )
}
```