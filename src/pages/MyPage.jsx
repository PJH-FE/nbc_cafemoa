import { Link } from 'react-router-dom';
import useGetArticlesByAuthorIdQuery from '../queries/useGetArticlesByAuthorIdQuery';
import useGetFollowersQuery from '../queries/useGetFollowersQuery';

const USER_ID = '1';

const MyPage = () => {
  const { data: articles } = useGetArticlesByAuthorIdQuery(USER_ID);
  const { data: followers } = useGetFollowersQuery(USER_ID);

  return (
    <>
      <div className="flex flex-col">
        <section>
          <h2>프로필 관련</h2>
          <p>이미지 변경, 닉네임, 작성글(숫자), 팔로우(숫자)</p>
        </section>
        <section>
          <h2>팔로우</h2>
          {followers.map(follower => (
            <div key={follower.id}>
              {
                <Link to={`/detail/${follower.id}`}>
                  <img src={follower.profile_image} alt={follower.description} />
                  <span>{follower.user_nickname}</span>
                </Link>
              }
            </div>
          ))}
          <h2>팔로잉</h2>
        </section>
      </div>
      <section className="bg-slate-300">
        <h1 className="text-xl">작성글</h1>
        {articles.map(article => (
          <article key={article.id} className="">
            {
              <Link to={`/detail/${article.id}`}>
                <span>{article.title}</span> - <span>{article.date}</span>
              </Link>
            }
          </article>
        ))}
      </section>
    </>
  );
};
export default MyPage;
