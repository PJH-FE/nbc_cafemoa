import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';

export const searchedArticles = async keyword => {
  const { data } = await DATA_API.get(`/articles`);
  return data.filter(article => article.title.toLowerCase().includes(keyword.toLowerCase()));
};

export const useSearchedArticles = keyword => {
  return useQuery({
    queryKey: ['articles', keyword],
    queryFn: () => searchedArticles(keyword),
  });
};
