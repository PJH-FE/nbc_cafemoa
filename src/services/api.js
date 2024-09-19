import { DATA_API } from '../api/api';

const getArticlesByAuthorId = async authorId => {
  const response = await DATA_API.get(`/articles?author_id=${authorId}`);
  return response.data;
};

const getFollowers = async userId => {
  const response = await DATA_API.get(`/users/${userId}`);
  const user = response.data;

  const followers = await Promise.all(
    user.follower.map(async followerId => {
      const followerResponse = await DATA_API.get(`/users/${followerId}`);
      return followerResponse.data;
    }),
  );

  return followers;
};

const getUserById = async userId => {
  const response = await DATA_API.get(`/users/${userId}`);
  return response.data;
};

const updateNickname = async (userId, newNickname) => {
  const response = await DATA_API.patch(`/user/${userId}`, { user_nickname: newNickname });
  return response.data;
};

const api = { getArticlesByAuthorId, getFollowers, getUserById, updateNickname };

export default api;
