import { useNavigate } from 'react-router-dom';

export default function ArticlesSection({ articles }) {
  const navigate = useNavigate();

  return (
    <section className="w-[55%] sm:w-full bg-white shadow-xl rounded-[6px] overflow-hidden">
      <h1 className="text-xl bg-primary01 text-white h-16 flex justify-center items-center font-semibold">
        작성글
      </h1>
      {articles?.length ? (
        articles.map(article => (
          <article
            key={article.id}
            className="flex items-center justify-between p-[20px] border-b-2 cursor-pointer h-14 border-primary01"
            onClick={() => navigate(`/detail?article_id=${article.id}`)}
          >
            <span className="text-[18px]">{article.title}</span>
            <span className="text-[18px]">{article.date}</span>
          </article>
        ))
      ) : (
        <p className="text-center py-5">작성한 글이 없습니다</p>
      )}
    </section>
  );
}
