import ProfileImageUploader from '../../components/ProfileImageUploader';
import NicknameEditor from '../../components/NicknameEditor';
import useUser from '../../hooks/useUser';
import DescriptionEditor from '../DescriptionEditor';
import FollowList from './FollowList';
import { useState } from 'react';
import FollowButton from './FollowButton';

export default function ProfileSection({ followers, following, id, isMyProfile }) {
  const [] = useState();
  const { user, changeNickname, changeProfileImage, changeDescription } = useUser(id);
  const { description, written_articles } = user;

  return (
    <div className="bg-white flex flex-col w-5/12 relative shadow-xl">
      {!isMyProfile && <FollowButton profile_id={id} />}

      <section className="h-1/4 w-full flex items-center">
        <div className="p-4">
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
