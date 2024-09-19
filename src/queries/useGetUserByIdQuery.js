import { useSuspenseQuery } from '@tanstack/react-query';
import api from '../services/api';
import queryKey from './queryKey.keys';

const useGetUserByIdQuery = userId => {
  return useSuspenseQuery({
    queryKey: queryKey.default.userById(userId),
    queryFn: () => api.getUserById(userId),
  });
};

export default useGetUserByIdQuery;
