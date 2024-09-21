import useGetArticlesByAuthorIdQuery from '../queries/useGetArticlesByAuthorIdQuery';
import useGetUserRelationsQuery from '../queries/useGetUserRelationsQuery';
import useUserStore from '../zustand/bearStore';
import ProfileSection from '../components/mypage/ProfileSection';
import ArticlesSection from '../components/mypage/ArticlesSection';

const MyPage = () => {
  const { getUserInfo } = useUserStore();
  const { id } = getUserInfo();
  const { data: articles } = useGetArticlesByAuthorIdQuery(id);
  const {
    data: { followers, following },
  } = useGetUserRelationsQuery(id);

  return (
    <>
      <ProfileSection followers={followers} following={following} id={id} />
      <ArticlesSection articles={articles} />
    </>
  );
};
export default MyPage;
