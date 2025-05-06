import './GoldenFarmApp.css';
import Menu from './Menu'; // Menu 컴포넌트 임포트
import React from 'react'; // React 임포트 추가

// 메뉴 아이템 인터페이스 정의 (Menu.tsx와 동일하게 유지)
interface MenuItemData {
  id: number;
  name: string;
  icon: React.ReactNode;
  submenu?: MenuItemData[];
}

const GoldenFarmApp = () => {

  // ➊ 화면으로 그릴 자료구조 정의
  const menuItems: MenuItemData[] = [
    { id: 1, name: 'Cheese', icon: '🧀' },
    {
      id: 2,
      name: 'Carrot', 
      icon: '🥕',
      submenu: [
        { id: 5, name: 'Baby Carrot', icon: '🍼' }, 
        { id: 6, name: 'Purple Carrot', icon: '🥕' },
      ],
    },
    { id: 3, name: 'Vegetables', icon: '🍃' },
    {
      id: 4,
      name: 'Milk',
      icon: '🥛',
      submenu: [
        { id: 7, name: 'Cow Milk', icon: '🥛' },
        { id: 8, name: 'Goat Milk', icon: '🧑‍🌾' }, // 농부 이모지로 대체
        {
          id: 9,
          name: 'Plant Milk',
          icon: '🍃',
          submenu: [
            { id: 10, name: 'Almond Milk', icon: '🍃' },
            { id: 11, name: 'Soy Milk', icon: '🍃' },
          ],
        },
      ],
    },
  ];

  // 메뉴 아이템을 렌더링하는 재귀 함수
  const renderMenuItems = (items: MenuItemData[]) =>
    items.map((item) => (
      <div key={item.id} className="menu-item">
        <div className="menu-item-name">
          {item.icon} {item.name}
        </div>
        {/* 하위 메뉴가 있으면 재귀적으로 렌더링 */} 
        {item.submenu && <div className="submenu">{renderMenuItems(item.submenu)}</div>}
      </div>
    ));

  return (
    <div className="app">
      <h1>Golden Farms</h1>
      {/* ➍ Menu 컴포넌트에 렌더 프롭 전달 */}
      {/* Menu 컴포넌트는 각 최상위 아이템(item)을 renderMenuItems 함수에 전달하여 UI 렌더링을 위임함 */}
      <Menu items={menuItems}>{(item) => <React.Fragment key={item.id}>{renderMenuItems([item])}</React.Fragment>}</Menu>
    </div>
  );
};

export default GoldenFarmApp; 