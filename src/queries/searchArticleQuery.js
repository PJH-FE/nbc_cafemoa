import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';

export const searchedArticles = async keyword => {
  const { data: articleData } = await DATA_API.get(`/articles`);
  const { data: cafeData } = await DATA_API.get(`/cafedb`);

  const articleList = articleData.filter(article =>
    article.title.toLowerCase().includes(keyword.toLowerCase()),
  );
  const cafeList = cafeData.filter(cafe => cafe.title.toLowerCase().includes(keyword.toLowerCase()));
  const totalData = [...articleList, ...cafeList];

  return totalData;
};

export const useSearchedArticles = keyword => {
  return useQuery({
    queryKey: ['articles', keyword],
    queryFn: () => searchedArticles(keyword),
  });
};
