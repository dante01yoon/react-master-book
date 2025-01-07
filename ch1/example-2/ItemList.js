import React, { useState } from 'react';

function ItemList() { // ➊ 컴포넌트 정의
    const [items, setItems] = useState(['Item 1']);

    function addItem() { // ➋ 아이템 추가 함수
        setItems([...items, 'New Item']);
    }

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
           {/* ➌ 클릭 이벤트가 발생하면 ul 리스트를 렌더링 */}
           <button onClick={addItem}>Add Item</button>  
        </div>
    );
}
