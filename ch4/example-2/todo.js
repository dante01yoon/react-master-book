// 각 파일에서 Model, View, Controller 클래스를 임포트함
import { TodoModel } from './TodoModel.js';
import { TodoView } from './TodoView.js';
import { TodoController } from './TodoController.js';

// 각 클래스의 인스턴스를 생성하고, Controller에 Model과 View를 주입하여 앱을 초기화함
const app = new TodoController(new TodoModel(), new TodoView());
