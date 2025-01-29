export function bindViewModel(viewModel, root) {
  // 투두 인풋을 위한 양방향 바인딩 구현
  const boundInputs = root.querySelectorAll('[data-bind]');
  boundInputs.forEach((inputEl) => {
    const property = inputEl.getAttribute('data-bind');

    // 뷰모델로 부터 초기 속성 값을 가져옵니다.
    inputEl.value = viewModel.get(property) || '';

    // 유저의 타이핑 이벤트가 발생하면 뷰모델의 속성을 변경합니다.
    inputEl.addEventListener('input', (e) => {
      viewModel.set(property, e.target.value);
    });

    // 뷰모델에서 관리하는 속성 변경을 통지받기 위해 구독을 수행하며 현재 인풋 텍스트와 다른 값이 입력되면 UI를 변경합니다.
    viewModel.subscribe((changedProp, newValue) => {
      if (changedProp === property && inputEl.value !== newValue) {
        inputEl.value = newValue;
      }
    });
  });

  // 2) 버튼 클릭을 수행하기 위한 뷰모델의 메서드를 사용하기 위한 data-click 속성에 대한 로직 선언합니다.
  const clickableEls = root.querySelectorAll('[data-click]');
  clickableEls.forEach((clickEl) => {
    const methodName = clickEl.getAttribute('data-click');
    
    // 클릭 이벤트가 발생하면 `viewModel[methodName]()`을 실행합니다.
    clickEl.addEventListener('click', () => {
      if (typeof viewModel[methodName] === 'function') {
        viewModel[methodName]();
      }
    });
  });

  // 3) 투두리스트를 렌더링하기 위한 data-list 사용 로직을 정의합니다.
  //    투두리스트가 변경될때마다 다시 렌더링됩니다.
  const listEls = root.querySelectorAll('[data-list]');
  listEls.forEach((listEl) => {
    const property = listEl.getAttribute('data-list');

    // 리스트를 처음부터 새롭게 만들기 위해 사용하는 헬퍼 함수입니다.
    const renderList = (items) => {
      listEl.innerHTML = ''; // 현재 존재하고 있는 리스트를 초기화합니다.

      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        // viewModel.removeTodo(index)를 호출하기 위한 버튼 엘리먼트를 생성합니다.
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.style.marginLeft = '8px';
        removeBtn.addEventListener('click', () => {
          if (viewModel.removeTodo) {
            viewModel.removeTodo(index);
          }
        });

        li.appendChild(removeBtn);
        listEl.appendChild(li);
      });
    };

    // 초기 렌더링을 수행합니다.
    const initialValue = viewModel.get(property) || [];
    renderList(initialValue);

    // 뷰모델에서 관리하는 속성 값이 변경될때마다 렌더링을 다시 수행합니다.
    viewModel.subscribe((changedProp, newValue) => {
      if (changedProp === property) {
        renderList(newValue);
      }
    });
  });
}
