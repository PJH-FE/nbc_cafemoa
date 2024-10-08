import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import queryKey from '../queries/queryKey.keys';

const useUpdateUserMutation = id => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, field, value }) => api.updateUser(userId, { [field]: value }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.default.userById(id));
    },
  });
};

export default useUpdateUserMutation;
