$(document).ready(function() {
  $('#addItem').click(function() { // ❶ 버튼을 클릭하면 아래 함수가 실행됩니다.
      $('#itemList').append('<li>New Item</li>'); // ❷ 새로운 아이템을 추가합니다.
  });
});
