import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import queryKey from '../queries/queryKey.keys';

const useToggleFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ currentUserId, targetUserId, action }) =>
      api.toggleFollow(currentUserId, targetUserId, action),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey.default.userById());
      queryClient.invalidateQueries(queryKey.default.followersAndFollowing);
    },
  });
};

export default useToggleFollowMutation;
