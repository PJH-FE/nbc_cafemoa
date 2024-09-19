import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/AuthClient';
import useUserStore from '../zustand/bearStore';
import { useNavigate } from 'react-router-dom';
import { DATA_API } from '../api/api';
import { useState } from 'react';

const AuthForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: '',
  });
  const { setUserInfo, removeUserInfo } = useUserStore();

  const navigate = useNavigate();

  // 머니풀 회원가입
  const { mutate } = useMutation({
    mutationFn: userData => (mode === 'signup' ? register(userData) : login(userData)),
    onSuccess: async data => {
      if (mode === 'signup') {
        await createUser({ id: formData.id, nickname: formData.nickname });
        removeUserInfo();
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

  //db.json 등록
  const createUser = async ({ id, nickname }) => {
    const { data } = await DATA_API.post('/users', { id, nickname });
    return data;
  };

  const handleSubmit = e => {
    e.preventDefault();
    mutate(formData);
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          type="password"
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
