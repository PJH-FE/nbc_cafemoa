import { DATA_API } from '../api/api';

export const getUserByMoneyPullId = async user_id => {
  const response = await DATA_API.get(`/users?user_id=${user_id}`);
  return response.data[0];
};
