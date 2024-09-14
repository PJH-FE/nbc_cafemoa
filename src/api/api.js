import axios from 'axios';

export const DATA_API = axios.create({
  // baseURL: 'https://sugary-scarce-story.glitch.me'
  baseURL: 'http://localhost:5000',
});
