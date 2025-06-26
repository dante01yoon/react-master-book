export class TodoView {
  constructor() {
    this.app = document.getElementById('app'); // 앱을 실행시킬 엘리먼트
    this.todoList = document.createElement('ul'); // 투두리스트를 렌더링할 엘리먼트
    this.input = document.createElement('input'); // 새로운 투두를 입력받을 필드
    this.addButton = document.createElement('button'); // 입력받은 투두를 등록할 버튼
    this.addButton.textContent = 'Add';

    this.app.appendChild(this.input);
    this.app.appendChild(this.addButton);
    this.app.appendChild(this.todoList);
  }

  renderTodos(todos) { // 투두리스트 앱을 그리기 시작합니다.
    this.todoList.innerHTML = ''; // 기존에 화면에 존재하던 투두리스트를 삭제합니다.
    todos.forEach((todo, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = todo;

      const deleteButton = document.createElement('button'); // 투두를 삭제할 버튼 엘리먼트를 생성합니다.
      deleteButton.textContent = 'Delete';
      // 어떤 항목을 식별할 수 있도록 data-index 속성 추가
      deleteButton.dataset.index = index;

      listItem.appendChild(deleteButton);
      this.todoList.appendChild(listItem);
    });
  }
}