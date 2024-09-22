import useGetArticlesByAuthorIdQuery from '../queries/useGetArticlesByAuthorIdQuery';
import useGetUserRelationsQuery from '../queries/useGetUserRelationsQuery';
import useUserStore from '../zustand/bearStore';
import ProfileSection from '../components/profile/ProfileSection';
import ArticlesSection from '../components/profile/ArticlesSection';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { profile_id } = useParams();
  const { getUserInfo } = useUserStore();
  const { id } = getUserInfo();
  const { data: articles } = useGetArticlesByAuthorIdQuery(profile_id);
  const {
    data: { followers, following },
  } = useGetUserRelationsQuery(profile_id);

  const isMyProfile = profile_id === id;

  return (
    <div className="flex justify-between h-[90vh] w-screen py-16 px-32 gap-32 bg-[#F4EFEB]">
      <ProfileSection followers={followers} following={following} id={profile_id} isMyProfile={isMyProfile} />
      <ArticlesSection articles={articles} />
    </div>
  );
};
export default ProfilePage;
