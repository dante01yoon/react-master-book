const userModel = {
  users: [], // users 객체는 뷰를 위해 관리하는 클라이언트 상태 값입니다.
  fetchUsers: async () => {
    const response = await fetch('/api/users'); // fetch API를 사용해 서버에서 유저 데이터를 가져옵니다.
    userModel.users = await response.json();
  },
};
