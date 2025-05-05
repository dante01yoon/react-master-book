import { ButtonHTMLAttributes } from "react";
interface CustomAttributeProps {
  // button 요소의 disabled 속성은 boolean 타입이어야 하지만,
  // 여기서는 의도적으로 number 타입으로 정의하여 타입 에러를 유발함
  disabled: number;
 };

 // 잘못된 타입의 속성을 받는 컴포넌트
 const CustomAttribute = ({
  disabled
 }: CustomAttributeProps) => {
  return (
    // button 요소의 disabled 속성에 boolean이 아닌 number 타입 값을 전달하려고 시도함
    // 이로 인해 TypeScript에서 타입 에러가 발생함
    <button
      disabled={disabled}
    >
      attribute의 속성은 임의로 변경할 수 없습니다.
    </button>
  )
 }
 export default CustomAttribute;
