import useGetArticlesByAuthorIdQuery from '../queries/useGetArticlesByAuthorIdQuery';
import useGetUserRelationsQuery from '../queries/useGetUserRelationsQuery';
import useUserStore from '../zustand/bearStore';
import ProfileSection from '../components/profile/ProfileSection';
import ArticlesSection from '../components/profile/ArticlesSection';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { profile_id } = useParams();

  const { getUserInfo } = useUserStore();
  const userInfo = getUserInfo();
  const id = userInfo ? userInfo.id : null;

  const { data: articles } = useGetArticlesByAuthorIdQuery(profile_id);

  const { data: relations } = useGetUserRelationsQuery(profile_id);
  const { followers, following } = relations;

  const isMyProfile = profile_id === id;

  return (
    <main className="flex justify-between gap-12 min-h-[54rem] w-screen py-16 px-32 bg-[#F4EFEB]">
      <ProfileSection followers={followers} following={following} id={profile_id} isMyProfile={isMyProfile} />
      <ArticlesSection articles={articles} />
    </main>
  );
};
export default ProfilePage;
