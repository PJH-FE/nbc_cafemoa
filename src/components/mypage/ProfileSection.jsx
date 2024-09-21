import ProfileImageUploader from '../../components/ProfileImageUploader';
import NicknameEditor from '../../components/NicknameEditor';
import useUser from '../../hooks/useUser';
import FollowerList from './FollowerList';

export default function ProfileSection({ followers, following, id }) {
  const { user, changeNickname, changeProfileImage } = useUser(id);
  const { description, written_articles } = user || {};

  return (
    <div className="flex flex-col">
      <section className="bg-slate-100">
        <h2 className="text-xl">프로필 </h2>
        <NicknameEditor changeNickname={changeNickname} userNickname={user.user_nickname} />
        <ProfileImageUploader profileURL={user.profile_image} changeProfileImage={changeProfileImage} />

        <p>게시글 : {written_articles.length}개</p>
        <p>팔로우 : {followers.length}명</p>
        <p>한줄 소개 : {description || '없음'}</p>
      </section>

      <section className="bg-slate-500">
        <FollowerList followers={followers} title="팔로우 목록" />
        <FollowerList followers={following} title="팔로잉 목록" />
      </section>
    </div>
  );
}
