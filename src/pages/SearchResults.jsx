import { useSearchParams } from 'react-router-dom';
import { useSearchedArticles } from '../queries/searchArticleQuery';
import SpotListItem from '../components/SpotListItem';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const { data: articles, isPending, error } = useSearchedArticles(searchKeyword);

  if (isPending) return <p>로딩중</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <div className="max-w-[1500px] my-0 mx-[auto]">
      <div className="flex justify-start p-5">
        <span className="text-red-500">{searchKeyword}</span>에 대한&nbsp;
        <span className="text-red-500">{articles.length}</span>개의 게시물이 있습니다.
      </div>

      <ul className="grid gap-[20px] grid-cols-4 p-5 pt-[3%] sm:grid-cols-2 sm:gap-x-[10px] sm:gap-y-[50px]">
        {articles.length === 0 ? (
          <div>검색 결과가 없습니다.</div>
        ) : (
          articles.map((article, index) => {
            return <SpotListItem key={index} data={article} />;
          })
        )}
      </ul>
    </div>
  );
};
export default SearchResults;
