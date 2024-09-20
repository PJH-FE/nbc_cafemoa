import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/AuthClient';
import useUserStore from '../zustand/bearStore';
import { useNavigate } from 'react-router-dom';
import { DATA_API } from '../api/api';
import { useRef, useState } from 'react';
import { getUserByMoneyPullId } from '../services/userService';

const AuthForm = ({ mode }) => {
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const nicknameRef = useRef(null);

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
        await createUser({ user_id: formData.id, user_nickname: formData.nickname });
        removeUserInfo();
        navigate('/login');
      } else {
        const user = await getUserByMoneyPullId(data.userId);

        if (!user) {
          alert('해당 사용자를 찾을 수 없습니다.');
          navigate('/signup');
          return;
        }

        setUserInfo(user);
        navigate('/');
      }
    },
    onError: error => {
      console.error('회원가입 실패', error.message);
    },
  });

  //db.json 등록
  const createUser = async ({ user_id, user_nickname }) => {
    const { data } = await DATA_API.post('/users', {
      user_id,
      user_nickname,
      profile_image: '',
      description: '',
      following: [],
      follower: [],
      written_articles: [],
      bookmarked: [],
    });
    return data;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.id || formData.id.length < 4) {
      alert('아이디는 최소 4글자 이상이여야 합니다.');
      idRef.current.focus();
      return;
    }
    if (!formData.password || formData.password.length < 4) {
      alert('비밀번호는 최소 4글자 이상이여야 합니다.');
      passwordRef.current.focus();
      return;
    }
    if (mode === 'signup' && (!formData.nickname || formData.nickname.length > 2)) {
      alert('닉네임은 최소 2글자 이상이여야 합니다.');
      nicknameRef.current.focus();
      return;
    }
    mutate(formData);
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
          ref={idRef}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          ref={passwordRef}
          required
        />
        {mode === 'signup' && (
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
            ref={nicknameRef}
            required
          />
        )}
      </div>
      <button type="sumbit">{mode === 'signup' ? '회원가입' : '로그인'}</button>
    </form>
  );
};

export default AuthForm;
