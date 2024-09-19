import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const searchedArticles = async keyword => {
    const { data } = await DATA_API.get(`/articles?title_like=${keyword}`);
    return data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: [searchKeyword],
    queryFn: searchedArticles(searchKeyword),
  });

  if (isPending) return <p>로딩중</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <div>
      <ul>
        {data?.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default SearchResults;
