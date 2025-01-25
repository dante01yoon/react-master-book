const UserController = () => {
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    const transformedData = data.map((user) => ({
      id: user.id,
      displayName: `${user.firstName} ${user.lastName}`,
    })); // 데이터를 UI에 보여주기 편하게 변환합니다.
    setUsers(transformedData);
  };

  React.useEffect(() => {
    fetchUsers(); // 서버 데이터를 불러옵니다.
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.displayName}</li>
      ))}
    </ul>
  );
};
