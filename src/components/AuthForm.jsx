import { useMutation } from '@tanstack/react-query';
import { register } from '../api/AuthClient';
import useUserStore from '../zustand/bearStore';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const { formData, setData } = useUserStore();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: userData => register(userData),
    onSuccess: () => {
      navigate('/login');
    },
    onError: error => {
      console.error('회원가입 실패', error.message);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    mutate(formData);
  };
  const handleChange = e => {
    setData({ [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
      </div>
      <button type="sumbit">회원가입</button>
    </form>
  );
};

export default AuthForm;
