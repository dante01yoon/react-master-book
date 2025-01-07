function TodoApp() {
  const [todos, setTodos] = useState([]); // ➊ 할 일 목록 상태 초기화
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
      setTodos([...todos, newTodo]);
      setNewTodo('');
  };

  return (
      <div>
          <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add</button> {/* ➋ 할 일 추가 버튼 */}
          <ul>
              {todos.map((todo, index) => (
                  <li key={index}>{todo}</li>
              ))}
          </ul>
      </div>
  );
}
