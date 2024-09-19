import { useSuspenseQuery } from '@tanstack/react-query';
import api from '../services/api';
import queryKey from './queryKey.keys';

const useGetArticlesByAuthorIdQuery = authorId => {
  return useSuspenseQuery({
    queryKey: queryKey.default.articlesByAuthor(authorId),
    queryFn: () => api.getArticlesByAuthorId(authorId),
  });
};

export default useGetArticlesByAuthorIdQuery;
