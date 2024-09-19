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

const api = { getArticlesByAuthorId, getFollowersAndFollowing, getUserById, updateUser };

export default api;
