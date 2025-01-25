const FormController = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';
    return newErrors;
  };

  const handleSubmit = () => { // 사용자의 인터렉션을 어떻게 해석할지 정의합니다.
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // 유저에게 보여줄 에러를 정의합니다.
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
