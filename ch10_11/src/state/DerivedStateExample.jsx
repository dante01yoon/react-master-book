import { useState, useMemo } from 'react';

const allTodos = [
  { id: 1, text: '리액트 공부하기', completed: true },
  { id: 2, text: '상태 관리 배우기', completed: false },
  { id: 3, text: '파생 상태 이해하기', completed: false },
];

type Filter = 'all' | 'completed' | 'active';

function DerivedStateExample() {
  const [todos] = useState(allTodos);
  const [filter, setFilter] = useState<Filter>('all');

  // ➊ 파생 상태: todos나 filter가 변경될 때마다 다시 계산됨
  // 별도의 state로 관리하지 않고, 렌더링 중에 직접 계산
  const visibleTodos = useMemo(() => {
    console.log('파생 상태(visibleTodos) 계산 중...');
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'active':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]); // todos 또는 filter가 변경될 때만 재계산

  return (
    <div>
      <h2>파생 상태 예제</h2>
      <div>
        <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
          전체
        </button>
        <button
          onClick={() => setFilter('active')}
          disabled={filter === 'active'}
        >
          할 일
        </button>
        <button
          onClick={() => setFilter('completed')}
          disabled={filter === 'completed'}
        >
          완료
        </button>
      </div>
      <ul style={{ marginTop: '10px' }}>
        {visibleTodos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #eee',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h4>설명:</h4>
        <p>
          <strong>파생 상태 (<code>visibleTodos</code>):</strong>{' '}
          <code>todos</code>와 <code>filter</code>라는 원본 상태에서 파생된 값입니다. 별도의 <code>useState</code>로 저장하는 대신, <code>useMemo</code>를 사용하여 렌더링 시 필요에 따라 재계산합니다. 이렇게 하면 상태의 원본 출처가 하나로 유지되어 데이터 불일치 문제를 방지할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default DerivedStateExample;