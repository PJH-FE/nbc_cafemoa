import { Link } from 'react-router-dom';

export default function ArticlesSection({ articles }) {
  return (
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
  );
}
