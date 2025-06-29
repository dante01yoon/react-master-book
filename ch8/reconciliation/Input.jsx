import { useEffect } from 'react';

const Input = ({ name, ...props}) => {
  // ➊ 이 컴포넌트가 마운트될 때 한 번만 실행됨
  useEffect(() => {
    console.log(`Input "${name}" mounted`);
    return () => console.log(`Input "${name}" unmounted`);
  }, [name]); // name이 바뀔 때마다 실행되도록 수정 (언마운트 추적용)
  
  return <input {...props} name={name} />;
}

export default Input
