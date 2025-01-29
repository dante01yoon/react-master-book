import { ViewModel } from './ViewModel.js';
import { bindViewModel } from './binder.js';

const vm = new ViewModel(); // 뷰모델 인스턴스를 생성합니다.

const rootElement = document.getElementById('app'); // 애플리케이션의 시작점인 <div id="app">를 찾습니다.

bindViewModel(vm, rootElement); // ViewModel과 돔을 binder를 사용해 연결합니다.


vm.set('todos', ['양방향 바인딩 구현하기', '단방향 바인딩 공부하기']); // 뷰모델에서 제공하는 set 메서드를 사용해 초기 데이터를 설정할 수 있습니다.
