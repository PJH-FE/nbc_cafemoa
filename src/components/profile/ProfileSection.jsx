import ProfileImageUploader from '../../components/ProfileImageUploader';
import NicknameEditor from '../../components/NicknameEditor';
import useUser from '../../hooks/useUser';
import DescriptionEditor from '../DescriptionEditor';
import FollowList from './FollowList';
import { useState } from 'react';
import FollowButton from './FollowButton';

export default function ProfileSection({ articles, followers, following, id, isMyProfile }) {
  const [] = useState();
  const { user, changeNickname, changeProfileImage, changeDescription } = useUser(id);
  const { description } = user;

  return (
    <div className="bg-white sm:bg-transparent flex flex-col w-[40%] lg:border-2 border-primary01 sm:w-full lg:shadow-xl rounded-[6px]">
      <section className="flex items-center w-full sm:h-full sm:flex-col py-[30px] px-6 sm:p-[0px] sm:pb-[16px] gap-[30px]">
        <div>
          <ProfileImageUploader
            profileURL={user.profile_image}
            changeProfileImage={changeProfileImage}
            isMyProfile={isMyProfile}
          />
        </div>
        <div className="flex flex-col gap-[10px] w-full sm:items-center">
          <div className="relative flex items-center justify-between sm:flex-col-reverse">
            <NicknameEditor
              changeNickname={changeNickname}
              userNickname={user.user_nickname}
              isMyProfile={isMyProfile}
            />
            {!isMyProfile && <FollowButton profile_id={id} />}
          </div>
          <div className="flex gap-4 ">
            <span>게시글 : {articles.length}개</span>
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
