import useUpdateUserMutation from '../mutation/useUpdateUserMutation';
import useGetUserByIdQuery from '../queries/useGetUserByIdQuery';

const useUser = userId => {
  const { data: user } = useGetUserByIdQuery(userId);
  const { mutate: updateUser } = useUpdateUserMutation(userId);

  const updateUserInfo = (field, value) => {
    updateUser({ userId, field, value });
  };

  // 사용처에서 꺼내서 쓰는 게 맞을까, 아니면 내부에서 계산해 외부에서 바로 쓰게 하는 게 맞을까?
  const totalWrittenArticles = user.written_articles.length;
  const totalFollowers = user.follower.length;

  return {
    user,
    changeNickname: newNickname => updateUserInfo('user_nickname', newNickname),
    changeProfileImage: newProfileImage => updateUserInfo('profile_image', newProfileImage),
    changeDescription: newDescription => updateUserInfo('description', newDescription),

    totalWrittenArticles,
    totalFollowers,
  };
};

export default useUser;
