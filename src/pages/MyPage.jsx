import { Link } from 'react-router-dom';
import useGetArticlesByAuthorIdQuery from '../queries/useGetArticlesByAuthorIdQuery';
import useGetFollowersQuery from '../queries/useGetFollowersQuery';
import useUser from '../hooks/useUser';
import ProfileImageUploader from '../components/ProfileImageUploader';
import NicknameEditor from '../components/NicknameEditor';

// Context로 user_id를 통해서 받아오기
const USER_ID = '1';

const MyPage = () => {
  const { data: articles } = useGetArticlesByAuthorIdQuery(USER_ID);
  const { data: followers } = useGetFollowersQuery(USER_ID);
  const { user, changeNickname, changeProfileImage } = useUser(USER_ID);

  const { description, written_articles, follower } = user || {};

  return (
    <>
      <div className="flex flex-col">
        <section className="bg-slate-100">
          <h2 className="text-xl">프로필 </h2>
          <NicknameEditor changeNickname={changeNickname} userNickname={user?.user_nickname} />
          <ProfileImageUploader profileURL={user?.profile_image} changeProfileImage={changeProfileImage} />

          <p>게시글 : {written_articles?.length}개</p>
          <p>팔로우 : {follower?.length}명</p>
          <p>한줄 소개 : {description || '없음'}</p>
        </section>

        <section className="bg-slate-500">
          <h2 className="text-xl">팔로우 목록</h2>
          {followers?.length ? (
            followers.map(follower => (
              <div key={follower.id}>
                {
                  <Link to={`/detail/${follower.id}`}>
                    <img src={follower.profile_image} alt={follower.description} />
                    <span>{follower.user_nickname}</span>
                  </Link>
                }
              </div>
            ))
          ) : (
            <p>팔로우가 없습니다</p>
          )}
          <h2>팔로잉</h2>
        </section>
      </div>

      <section className="bg-slate-300">
        <h1 className="text-xl">작성글</h1>
        {articles?.length ? (
          articles.map(article => (
            <article key={article.id} className="">
              {
                <Link to={`/detail/${article.id}`}>
                  <span>{article.title}</span> - <span>{article.date}</span>
                </Link>
              }
            </article>
          ))
        ) : (
          <p>작성한 글이 없습니다</p>
        )}
      </section>
    </>
  );
};
export default MyPage;
