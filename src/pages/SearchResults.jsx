import { useSearchParams } from 'react-router-dom';
import { useSearchedArticles } from '../queries/searchArticleQuery';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const { data: articles, isPending, error } = useSearchedArticles(searchKeyword);

  if (isPending) return <p>로딩중</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <div>
      <div>
        <span>{searchKeyword}</span>에 대한
        <span> {articles.length}</span>개의 게시물이 있습니다.
      </div>

      <ul>
        {articles.length === 0 ? (
          <div>검색 결과가 없습니다.</div>
        ) : (
          articles.map(article => <li key={article.id}>{article.title}</li>)
        )}
      </ul>
    </div>
  );
};
export default SearchResults;
