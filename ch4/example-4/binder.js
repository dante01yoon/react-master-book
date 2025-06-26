export function bindViewModel(viewModel, root) {
  // --- 1. 양방향 바인딩 처리 (data-bind) ---
  const boundInputs = root.querySelectorAll('[data-bind]');
  boundInputs.forEach((inputEl) => {
    const property = inputEl.getAttribute('data-bind');

    // ➊ 초기화: 뷰모델의 현재 값으로 input의 value를 설정
    inputEl.value = viewModel.get(property) || '';

    // ➋ 뷰 → 뷰모델: 사용자가 input에 타이핑할 때마다 뷰모델의 상태를 업데이트
    inputEl.addEventListener('input', (e) => {
      viewModel.set(property, e.target.value);
    });

    // ➌ 뷰모델 → 뷰: 뷰모델의 상태가 변경되면, input의 value를 업데이트
    viewModel.subscribe((changedProp, newValue) => {
      if (changedProp === property && inputEl.value !== newValue) {
        inputEl.value = newValue;
      }
    });
  });

  // --- 2. 이벤트 바인딩 처리 (data-click) ---
  const clickableEls = root.querySelectorAll('[data-click]');
  clickableEls.forEach((clickEl) => {
    const methodName = clickEl.getAttribute('data-click');
    
    // ➍ 클릭 이벤트가 발생하면, 뷰모델에 정의된 해당 이름의 메서드를 실행
    clickEl.addEventListener('click', () => {
      if (typeof viewModel[methodName] === 'function') {
        viewModel[methodName]();
      }
    });
  });

  // --- 3. 리스트 렌더링 처리 (data-list) ---
  const listEls = root.querySelectorAll('[data-list]');
  listEls.forEach((listEl) => {
    const property = listEl.getAttribute('data-list');

    // ➎ 배열 데이터를 받아 <li> 목록을 렌더링하는 헬퍼 함수
    const renderList = (items) => {
      listEl.innerHTML = ''; // 기존 목록을 초기화
      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '삭제';
        removeBtn.style.marginLeft = '8px';
        removeBtn.addEventListener('click', () => {
          viewModel.removeTodo(index);
        });

        li.appendChild(removeBtn);
        listEl.appendChild(li);
      });
    };

    // ➏ 초기 렌더링 실행
    renderList(viewModel.get(property) || []);

    // ➐ 뷰모델의 'todos' 배열이 변경될 때마다, renderList 함수를 다시 호출하여 UI를 업데이트
    viewModel.subscribe((changedProp, newValue) => {
      if (changedProp === property) {
        renderList(newValue);
      }
    });
  });
}