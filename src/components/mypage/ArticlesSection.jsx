import { Link, useNavigate } from 'react-router-dom';

export default function ArticlesSection({ articles }) {
  const navigate = useNavigate();

  return (
    <section className="w-6/12 bg-white">
      <h1 className="text-xl bg-customHardBorder text-white h-16 flex justify-center items-center font-semibold">
        작성글
      </h1>
      {articles?.length ? (
        articles.map(article => (
          <article
            key={article.id}
            className="h-14 flex items-center justify-between cursor-pointer p-2 border-customHardBorder border-b-2"
            onClick={() => navigate(`/detail/${article.id}`)}
          >
            <span>{article.title}</span>
            <span>{article.date}</span>
          </article>
        ))
      ) : (
        <p>작성한 글이 없습니다</p>
      )}
    </section>
  );
}
