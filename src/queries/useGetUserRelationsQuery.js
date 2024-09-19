import { useSuspenseQuery } from '@tanstack/react-query';
import api from '../services/api';
import queryKey from './queryKey.keys';

const useGetUserRelationsQuery = userId => {
  return useSuspenseQuery({
    queryKey: queryKey.default.userRelations(userId),
    queryFn: () => api.getFollowersAndFollowing(userId),
  });
};

export default useGetUserRelationsQuery;
