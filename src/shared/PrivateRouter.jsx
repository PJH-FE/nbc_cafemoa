import { Navigate } from 'react-router-dom';
import useUserStore from '../zustand/bearStore';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const PrivateRouter = ({ page }) => {
  const userInfo = useUserStore(state => state.getUserInfo());

  useEffect(() => {
    if (!userInfo) {
      toast.error('로그인이 필요한 서비스입니다.');
    }
  }, [userInfo]);

  if (userInfo) return page;

  return <Navigate to={'/login'} />;
};

export const PublicRouter = ({ page }) => {
  const userInfo = useUserStore(state => state.getUserInfo());

  if (!userInfo) return page;

  return <Navigate to={`/`} />;
};
