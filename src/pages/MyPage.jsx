import { Link } from 'react-router-dom';
import useGetArticlesByAuthorIdQuery from '../queries/useGetArticlesByAuthorIdQuery';
import useUser from '../hooks/useUser';
import ProfileImageUploader from '../components/ProfileImageUploader';
import NicknameEditor from '../components/NicknameEditor';
import useGetUserRelationsQuery from '../queries/useGetUserRelationsQuery';
import useUserStore from '../zustand/bearStore';

const MyPage = () => {
  const { getUserInfo } = useUserStore();
  const { id } = getUserInfo();
  const { data: articles } = useGetArticlesByAuthorIdQuery(id);
  const {
    data: { followers, following },
  } = useGetUserRelationsQuery(id);
  const { user, changeNickname, changeProfileImage } = useUser(id);

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
                  <Link to={`/detail/${follower.id}`} className="flex">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-gray-800 flex items-center justify-center ">
                      <img
                        src={follower.profile_image}
                        alt={follower.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{follower.user_nickname}</span>
                  </Link>
                }
              </div>
            ))
          ) : (
            <p>팔로우가 없습니다</p>
          )}
          <h2 className="text-xl">팔로잉 목록</h2>
          {following?.length ? (
            followers.map(follower => (
              <div key={follower.id}>
                {
                  <Link to={`/detail/${follower.id}`} className="flex">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-gray-800 flex items-center justify-center ">
                      <img
                        src={follower.profile_image}
                        alt={follower.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{follower.user_nickname}</span>
                  </Link>
                }
              </div>
            ))
          ) : (
            <p>팔로잉이 없습니다</p>
          )}
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
