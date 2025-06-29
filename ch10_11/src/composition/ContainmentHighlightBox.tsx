import React, { ReactNode } from 'react';

// HighlightBox 컴포넌트의 프롭스 타입을 정의함
interface HighlightBoxProps {
  backgroundColor?: string; // 배경색 (선택적)
  icon?: string; // 아이콘 이모지 (선택적)
  children: ReactNode; // 내부에 렌더링될 자식 요소들
}

/**
 * children 프롭스를 받아 특정 배경색과 아이콘으로 감싸 강조하는 컴포넌트.
 * Containment 패턴: children의 내용을 모르지만, 시각적 컨텍스트(강조)를 제공함.
 */
const HighlightBox: React.FC<HighlightBoxProps> = ({ 
  backgroundColor = '#f0f0f0', // 기본 배경색 설정
  icon, 
  children 
}) => {
  // 인라인 스타일을 사용하여 동적으로 배경색을 적용함
  const boxStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    display: 'flex', // 아이콘과 내용을 나란히 배치하기 위해 flex 사용
    alignItems: 'center', // 세로 중앙 정렬
  };

  const iconStyle: React.CSSProperties = {
    marginRight: '10px', // 아이콘과 내용 사이 간격
    fontSize: '1.5em', // 아이콘 크기
  };

  return (
    <div style={boxStyle}>
      {/* 아이콘 프롭스가 있으면 해당 아이콘을 표시함 */}
      {icon && <span style={iconStyle}>{icon}</span>}
      {/* 부모로부터 전달받은 children을 렌더링함 */}
      <div>
        {children}
      </div>
    </div>
  );
};

/**
 * HighlightBox 컴포넌트를 사용하는 예시 컴포넌트.
 */
const ContainmentHighlightApp: React.FC = () => {
  return (
    <div>
      <h1>Containment (포함) 패턴 - HighlightBox 예시</h1>

      {/* 기본 HighlightBox 사용 */}
      <HighlightBox>
        <p>이것은 기본 강조 상자입니다. 약간의 배경색이 적용됩니다.</p>
      </HighlightBox>

      {/* 배경색과 아이콘을 지정한 HighlightBox */}
      <HighlightBox backgroundColor="#e0f7fa" icon="💡">
        <h4>아이디어 제안</h4>
        <p>이 섹션은 중요한 제안 사항을 담고 있습니다.</p>
        <ul>
          <li>첫 번째 제안</li>
          <li>두 번째 제안</li>
        </ul>
      </HighlightBox>

      {/* 다른 배경색과 아이콘 사용 */}
      <HighlightBox backgroundColor="#fff9c4" icon="⚠️">
        <strong>경고:</strong>
        <p>시스템 점검이 예정되어 있습니다. 서비스 이용에 참고 바랍니다.</p>
        <button onClick={() => alert('세부 정보 확인')}>세부 정보</button>
      </HighlightBox>
       
      {/* 아이콘 없이 배경색만 지정 */}
      <HighlightBox backgroundColor="#ffebee">
         <em>알림:</em> 이용 약관이 변경되었습니다. 
      </HighlightBox>
    </div>
  );
};

export default ContainmentHighlightApp;