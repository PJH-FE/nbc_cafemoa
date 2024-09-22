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
    <div className="h-[100vh] sm:h-[auto]  bg-[#F4EFEB]">
      <div className="flex sm:flex-col sm:pb-[60px] lg:justify-between gap-[50px] w-full h-[80vh] sm:h-[auto] content">
        <ProfileSection
          followers={followers}
          following={following}
          id={profile_id}
          isMyProfile={isMyProfile}
          articles={articles}
        />
        <ArticlesSection articles={articles} />
      </div>
    </div>
  );
};
export default ProfilePage;
