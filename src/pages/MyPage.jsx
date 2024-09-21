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
    <div className="flex justify-between h-[90vh] w-screen py-16 px-32 gap-32 bg-[#F4EFEB]">
      <ProfileSection followers={followers} following={following} id={id} />
      <ArticlesSection articles={articles} />
    </div>
  );
};
export default MyPage;
