import { useState } from "react";
import Input from "./Input";

const Second = () => {
  const [disabled, setDisabled]  = useState(false);
  const toggle = () => {
    setDisabled(!disabled)
  }
  return (
    <div>
      <button onClick={toggle}>toggle disable</button>
      {disabled ? <Input disabled name="disabled-input" /> : null}
      {!disabled ? <Input name="active-input" /> : null}
    </div>
  )
}
