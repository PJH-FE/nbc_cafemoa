import { useEffect, useState } from 'react';
import FollowIcon from '../../assets/icons/FollowIcon';
import useUserStore from '../../zustand/bearStore';
import { DATA_API } from '../../api/api';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import api from '../../services/api';
import queryKey from '../../queries/queryKey.keys';

export default function FollowButton({ profile_id }) {
  const queryClient = useQueryClient();

  const [isClicked, setIsClicked] = useState(false);
  const { getUserInfo } = useUserStore();
  const data = getUserInfo();

  const getUserById = async userId => {
    const response = await DATA_API.get(`/users/${userId}`);
    return response.data;
  };

  const { data: result } = useSuspenseQuery({
    queryKey: ['users', data.id],
    queryFn: () => getUserById(data.id),
  });

  const updateUser = async (userId, currentId, action) => {
    const [profileUser, currentUser] = await Promise.all([
      api.getUserById(userId),
      api.getUserById(currentId),
    ]);

    const updatedCurrentUser = {
      ...currentUser,
      following:
        action === 'follow'
          ? [...currentUser.following, userId]
          : currentUser.following.filter(id => id !== userId),
    };

    const updatedProfileUser = {
      ...profileUser,
      follower:
        action === 'follow'
          ? [...profileUser.follower, currentId]
          : profileUser.follower.filter(id => id !== currentId),
    };

    await Promise.all([
      DATA_API.patch(`/users/${currentId}`, updatedCurrentUser),
      DATA_API.patch(`/users/${userId}`, updatedProfileUser),
    ]);
  };

  const { mutate } = useMutation({
    mutationFn: ({ profile_id, currentId, action }) => updateUser(profile_id, currentId, action),
    onSuccess: () => {
      setIsClicked(prev => !prev);
      queryClient.invalidateQueries(queryKey.default.userById(profile_id));
    },
  });

  const onClick = () => {
    const action = isClicked ? 'unfollow' : 'follow';
    mutate({ profile_id, currentId: data.id, action });
  };

  useEffect(() => {
    setIsClicked(result.following.includes(profile_id));
  }, [result.following, profile_id]);

  return (
    <button onClick={onClick}>
      <FollowIcon isClicked={isClicked} />
    </button>
  );
}
