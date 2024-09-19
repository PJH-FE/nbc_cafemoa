import { useSuspenseQuery } from '@tanstack/react-query';
import api from '../services/api';
import queryKey from './queryKey.keys';

const useGetFollowersQuery = userId => {
  return useSuspenseQuery({
    queryKey: queryKey.default.followers(userId),
    queryFn: () => api.getFollowers(userId),
  });
};

export default useGetFollowersQuery;
