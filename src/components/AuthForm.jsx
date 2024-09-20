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
          alert('해당 사용자를 찾을 수 없습니다. 회원가입 해주세요.');
          navigate('/signup');
          return;
        }

        setUserInfo(user);
        navigate('/');
      }
    },
    onError: error => {
      alert('아이디 또는 비밀번호를 확인해주세요.');
      console.error('요청 실패', error.message);
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-10 rounded-lg shadow-md min-h-[550px] w-full max-w-md">
        <h1 className="text-2xl mb-8">{mode === 'signup' ? '회원가입' : '로그인'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="label-primary">아이디</label>
            <input
              className="input-primary"
              type="text"
              name="id"
              placeholder="아이디"
              value={formData.id}
              onChange={handleChange}
              ref={idRef}
              required
            />
            <label className="label-primary">비밀번호</label>
            <input
              className="input-primary"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              ref={passwordRef}
              required
            />
            {mode === 'signup' && (
              <>
                <label className="label-primary">닉네임</label>
                <input
                  className="input-primary"
                  type="text"
                  name="nickname"
                  placeholder="닉네임"
                  value={formData.nickname}
                  onChange={handleChange}
                  ref={nicknameRef}
                  required
                />
              </>
            )}
          </div>
          <button className="bg-black text-white font-bold rounded w-full py-2 px-4 hover:opacity-50">
            {mode === 'signup' ? '회원가입' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
