import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import queryKey from '../queries/queryKey.keys';

const useUpdateNicknameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId, newNickname) => api.updateNickname(userId, newNickname),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.default.userById);
    },
  });
};

export default useUpdateNicknameMutation;
