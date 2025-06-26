export class TodoController {
  constructor(model, view) { // 생성자 인자로 모델과 뷰를 전달 받습니다.
    this.model = model;
    this.view = view;

    // 뷰(View)에서 발생하는 이벤트를 컨트롤러의 메서드와 바인딩
    this.view.addButton.addEventListener('click', this.handleAddTodo.bind(this));
    this.view.todoList.addEventListener('click', this.handleDeleteTodo.bind(this));
    // 애플리케이션 초기 상태를 렌더링
    this.updateView();
  }
  // '추가' 버튼 클릭 시 실행될 이벤트 핸들러
  handleAddTodo() {
    const todoText = this.view.input.value.trim();
    if (todoText) {
      this.model.addTodo(todoText); // 모델을 업데이트 합니다.
      this.updateView(); // 뷰를 업데이트 합니다.
      this.view.input.value = ''; // 인풋창을 초기화 합니다.
    }
  }
  // '삭제' 버튼 클릭 시 실행될 이벤트 핸들러
  handleDeleteTodo(event) {
    if (event.target.tagName === 'BUTTON') {
      const index = parseInt(event.target.dataset.index, 10);
      this.model.removeTodo(index); // 모델의 상태를 변경
      this.updateView(); // 뷰를 수동으로 다시 렌더링
    }
  }

  updateView() { // 모델의 최신 상태를 가져와 뷰를 업데이트하는 메서드
    const todos = this.model.getTodos();
    this.view.renderTodos(todos);
  }
}
