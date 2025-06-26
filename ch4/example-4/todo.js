import { ViewModel } from './ViewModel.js';
import { bindViewModel } from './binder.js';

// 뷰모델 인스턴스 생성
const vm = new ViewModel();
// 애플리케이션의 루트 DOM 요소를 찾음
const rootElement = document.getElementById('app');
// 바인더를 통해 뷰모델과 뷰(DOM)를 연결
bindViewModel(vm, rootElement);
// 뷰모델의 'set' 메서드를 사용해 초기 데이터를 설정.
// 이 코드가 실행되는 즉시, 바인더가 변경을 감지하여 UI에 목록을 렌더링함.
vm.set('todos', ['양방향 바인딩 구현하기', '단방향 바인딩 공부하기']);