import ProfileImageUploader from '../../components/ProfileImageUploader';
import NicknameEditor from '../../components/NicknameEditor';
import useUser from '../../hooks/useUser';
import DescriptionEditor from '../DescriptionEditor';
import FollowList from './FollowList';

export default function ProfileSection({ followers, following, id }) {
  const { user, changeNickname, changeProfileImage, changeDescription } = useUser(id);
  const { description, written_articles } = user;

  return (
    <div className="bg-white flex flex-col w-5/12 ">
      <section className="h-1/4 w-full flex items-center">
        <div className="p-4 ">
          <ProfileImageUploader profileURL={user.profile_image} changeProfileImage={changeProfileImage} />
        </div>
        <div className="w-full pr-4">
          <NicknameEditor changeNickname={changeNickname} userNickname={user.user_nickname} />
          <div className="flex gap-4 ">
            <span>게시글 : {written_articles.length}개</span>
            <span>팔로우 : {followers.length}명</span>
          </div>
          <DescriptionEditor description={description} changeDescription={changeDescription} />
        </div>
      </section>
      <FollowList followers={followers} following={following} />
    </div>
  );
}
