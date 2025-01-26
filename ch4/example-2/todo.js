
// 서로 다른 모듈에서 M,V,C 역할을 하는 클래스를 불러옵니다.
import { TodoModel } from './TodoModel.js';
import { TodoView } from './TodoView.js';
import { TodoController } from './TodoController.js';


// 앱을 초기화합니다.
const app = new TodoController(new TodoModel(), new TodoView());
