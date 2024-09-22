import { DATA_API } from '../api/api';

const getArticlesByAuthorId = async authorId => {
  const response = await DATA_API.get(`/articles?author_id=${authorId}`);
  return response.data;
};

const getFollowersAndFollowing = async userId => {
  const response = await DATA_API.get(`/users/${userId}`);
  const user = response.data;

  const followers = await Promise.all(
    user.follower.map(async followerId => {
      const followerResponse = await DATA_API.get(`/users/${followerId}`);
      return followerResponse.data;
    }),
  );

  const following = await Promise.all(
    user.following.map(async followingId => {
      const followingResponse = await DATA_API.get(`/users/${followingId}`);
      return followingResponse.data;
    }),
  );

  return { followers, following };
};

const getUserById = async userId => {
  const response = await DATA_API.get(`/users/${userId}`);
  return response.data;
};

const updateUser = async (userId, data) => {
  const response = await DATA_API.patch(`/users/${userId}`, data);
  return response.data;
};

const toggleFollow = async (currentUserId, targetUserId, action) => {
  const currentUserResponse = await DATA_API.get(`/users/${currentUserId}`);
  const currentUser = currentUserResponse.data;

  const targetUserResponse = await DATA_API.get(`/users/${targetUserId}`);
  const targetUser = targetUserResponse.data;

  let updatedCurrentUser;
  let updatedTargetUser;

  if (action === 'follow') {
    updatedCurrentUser = {
      ...currentUser,
      following: [...currentUser.following, targetUserId],
    };

    updatedTargetUser = {
      ...targetUser,
      follower: [...targetUser.follower, currentUserId],
    };
  } else if (action === 'unfollow') {
    updatedCurrentUser = {
      ...currentUser,
      following: currentUser.following.filter(id => id !== targetUserId),
    };

    updatedTargetUser = {
      ...targetUser,
      follower: targetUser.follower.filter(id => id !== currentUserId),
    };
  }

  await Promise.all([
    DATA_API.patch(`/users/${currentUserId}`, updatedCurrentUser),
    DATA_API.patch(`/users/${targetUserId}`, updatedTargetUser),
  ]);

  return { updatedCurrentUser, updatedTargetUser, toggleFollow };
};

const api = { getArticlesByAuthorId, getFollowersAndFollowing, getUserById, updateUser };

export default api;
