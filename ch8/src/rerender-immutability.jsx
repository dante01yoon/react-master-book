function GoldenRabbitPageBad({ color }) {
  // 스타일 객체 생성
  const styles = { color, sparkles: '✨', size: 'large' };
  // 생성된 스타일로 헤더 컴포넌트 생성
  const rabbitHeader = <RabbitHeader styles={styles} />;
   // ❌ JSX 요소에 전달된 객체를 직접 수정함. 이는 불변성 원칙 위반으로,
   // React가 변경 사항을 감지하지 못하거나 예측 불가능한 동작을 유발할 수 있음.
   styles.size = 'small';
   // 수정된 스타일 객체로 콘텐츠 컴포넌트 렌더링
   return <RabbitContent header={rabbitHeader} styles={styles} />;
 }
 
 function GoldenRabbitPageGood({ color }) {
  // 헤더에 사용할 스타일 객체 생성
  const headerStyles = {
    color,
    sparkles: '✨',
    size: 'large'
  };
  // 생성된 헤더 스타일로 헤더 컴포넌트 생성
   const rabbitHeader = <RabbitHeader styles={headerStyles} />;
   // ✅ 콘텐츠에 사용할 새로운 스타일 객체를 불변성을 유지하며 생성함.
   // 스프레드 연산자를 사용하여 기존 객체를 복사하고 필요한 속성만 변경함.
   // 이를 통해 원본 객체(headerStyles)의 불변성을 보장함.
   const contentStyles = {
    ...headerStyles,
    size: 'small'
  };
   // 새로운 콘텐츠 스타일 객체로 콘텐츠 컴포넌트 렌더링
   return <RabbitContent header={rabbitHeader} styles={contentStyles} />;
 }
 