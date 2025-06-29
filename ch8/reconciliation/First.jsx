import { useState } from "react";
import Input from "./Input";

const First = () => {
  const [disabled, setDisabled]  = useState(false);
  const toggle = () => {
    setDisabled(!disabled)
  }
  return (
    <div>
      <button onClick={toggle}>toggle disable</button>
      {/* 조건부 렌더링 */}
      {disabled 
        ? <Input disabled name="disabled-input" />
        : <Input name="active-input" />
      }
    </div>
  )
}
