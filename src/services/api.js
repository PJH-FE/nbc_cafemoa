import { DATA_API } from '../api/api';

const getArticlesByAuthorId = async authorId => {
  const response = await DATA_API.get(`/articles?author_id=${authorId}`);
  return response.data;
};

const api = { getArticlesByAuthorId };

export default api;
