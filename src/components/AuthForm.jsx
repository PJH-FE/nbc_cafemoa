import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/AuthClient';
import useUserStore from '../zustand/bearStore';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ mode }) => {
  const { formData, setData, setUserInfo } = useUserStore();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: userData => (mode === 'signup' ? register(userData) : login(userData)),
    onSuccess: data => {
      if (mode === 'signup') {
        navigate('/login');
      } else {
        setUserInfo(data);
        navigate('/');
      }
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
        {mode === 'signup' && (
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        )}
      </div>
      <button type="sumbit">{mode === 'signup' ? '회원가입' : '로그인'}</button>
    </form>
  );
};

export default AuthForm;
