import React from 'react';

// 메뉴 아이템 인터페이스 정의
interface MenuItem {
  id: number;
  name: string;
  icon: React.ReactNode; // 아이콘 타입 (이모지 등 포함 가능)
  submenu?: MenuItem[];   // 하위 메뉴 (선택 사항)
}

// Menu 컴포넌트 프롭스 인터페이스 정의
interface MenuProps {
  items: MenuItem[]; // 메뉴 아이템 배열
  // 렌더 프롭: 각 메뉴 아이템을 인수로 받아 React 노드를 반환하는 함수
  children: (item: MenuItem) => React.ReactNode;
}

/**
 * Menu 컴포넌트 (플레이스홀더)
 * 
 * 렌더 프롭 패턴을 사용하여 메뉴 항목 렌더링을 부모에게 위임함.
 * 이 컴포넌트는 전달받은 items 배열을 순회하며,
 * 각 item에 대해 children 함수(렌더 프롭)를 호출하여 실제 UI를 생성함.
 */
const Menu: React.FC<MenuProps> = ({ items, children }) => {
  console.log("플레이스홀더 Menu 렌더링됨. items 개수:", items.length);

  return (
    <div className="menu"> 
      {/* items 배열을 순회하며 각 item에 대해 children 함수를 호출함 */}
      {items.map(item => children(item))}
    </div>
  );
};

export default Menu; 