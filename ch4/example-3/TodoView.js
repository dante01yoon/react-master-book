// TodoView.js

export class TodoView {
  constructor() {
    this.app = document.getElementById('app');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Enter a new task...';

    this.addButton = document.createElement('button');
    this.addButton.textContent = 'Add';

    this.todoList = document.createElement('ul');

    // Append elements to the DOM
    this.app.appendChild(this.input);
    this.app.appendChild(this.addButton);
    this.app.appendChild(this.todoList);
  }

  // Render the list of todos
  renderTodos(todos) {
    this.todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = todo;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      // 어떤 항목을 식별할 수 있도록 data-index 속성 추가
      deleteButton.dataset.index = index;

      listItem.appendChild(deleteButton);
      this.todoList.appendChild(listItem);
    });
  }
}
