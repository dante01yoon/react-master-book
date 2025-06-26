const FormController = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});

  // 뷰가 직접 유효성 검사 로직을 알 필요 없이, 이 함수를 통해 결과만 받음
  const validateForm = () => { // 에러를 UI에 표시해야 하는지 판단하는 유효성 검사 로직을 캡슐화
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';
    return newErrors;
  };

  // 사용자 입력(submit)을 해석하고 상태 업데이트를 결정함
  const handleSubmit = () => { // 사용자의 인터렉션을 어떻게 해석할지 정의
    const validationErrors = validateForm();
    // 에러가 없다면(유효성 검사를 통과했다면) 최종 로직을 실행함
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // 유저에게 보여줄 에러를 정의
    } else {
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Enter your email"
      />
      {errors.email && <span>{errors.email}</span>}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Enter your password"
      />
      {errors.password && <span>{errors.password}</span>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
