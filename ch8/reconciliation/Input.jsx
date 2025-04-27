import { useEffect, useState } from "react";

const Input = ({ name, ...props}) => {
  useEffect(() => {
    console.log("name: ", name);
  },[]);
  return (
    <input {...props} name={name} />
  )
 }

 export default Input
 
const First = () => {
  const [disabled, setDisabled]  = useState(false);
  const toggle = () => {
    setDisabled(!disabled)
  }
  return (
    <div>
      <button onClick={toggle}>toggle disable</button>
      {disabled 
        ? <Input disabled name="disabled-input" />
        : <Input name="active-input" />
      }
    </div>
  )
}
 
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
 