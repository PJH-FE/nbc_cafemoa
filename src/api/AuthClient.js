import axios from 'axios';

export const authClinet = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
});

export const register = async userData => {
  try {
    const { data } = await authClinet.post('/register', userData);
    return data;
  } catch (error) {
    throw new Error('이미 사용중인 사용자입니다.');
  }
};

export const login = async userData => {
  const { data } = await authClinet.post('/login', userData);

  return data;
};

export const checkUserId = async () => {
  const { data } = await authClinet.get();
};
