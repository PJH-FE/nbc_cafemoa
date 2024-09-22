import axios from 'axios';

export const DATA_API = axios.create({
  //baseURL: 'https://cooked-proximal-sorrel.glitch.me',
  baseURL: 'http://localhost:4000',
});
