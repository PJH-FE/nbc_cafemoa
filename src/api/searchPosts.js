import axios from 'axios';

const API_URL = 'http://localhost:5000/searchPosts';

export const getFilteredData = async keyword => {
  const { data } = await axios.get(`${API_URL}/search?keyword=${keyword}`);
  return data;
};
