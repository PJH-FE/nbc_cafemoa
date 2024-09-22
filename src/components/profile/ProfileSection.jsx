import ProfileImageUploader from '../../components/ProfileImageUploader';
import NicknameEditor from '../../components/NicknameEditor';
import useUser from '../../hooks/useUser';
import DescriptionEditor from '../DescriptionEditor';
import FollowList from './FollowList';

export default function ProfileSection({ followers, following, id, isMyProfile }) {
  const { user, changeNickname, changeProfileImage, changeDescription } = useUser(id);
  const { description, written_articles } = user;

  return (
    <div className="bg-white sm:bg-transparent flex flex-col w-[50%] sm:w-full ">
      <section className="flex items-center w-full sm:h-full sm:flex-col p-[30px] sm:p-[0px] sm:pb-[16px] gap-[30px]">
        <div className="">
          <ProfileImageUploader
            profileURL={user.profile_image}
            changeProfileImage={changeProfileImage}
            isMyProfile={isMyProfile}
          />
        </div>
        <div className="flex flex-col gap-[10px] w-full pr-4 sm:pr-0 sm:items-center">
          <NicknameEditor
            changeNickname={changeNickname}
            userNickname={user.user_nickname}
            isMyProfile={isMyProfile}
          />
          <div className="flex gap-4 ">
            <span>게시글 : {written_articles.length}개</span>
            <span>팔로우 : {followers.length}명</span>
          </div>
          <DescriptionEditor
            description={description}
            changeDescription={changeDescription}
            isMyProfile={isMyProfile}
          />
        </div>
      </section>
      <FollowList followers={followers} following={following} />
    </div>
  );
}
