import axios from 'axios';

export const authClinet = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
});

export const register = async userData => {
  const { data } = await authClinet.post('/register', userData);
  return data;
};

export const login = async userData => {
  const { data } = await authClinet.post('/login', userData);
  return data;
};
