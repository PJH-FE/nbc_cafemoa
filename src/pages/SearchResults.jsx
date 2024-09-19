import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const searchedArticles = async keyword => {
    const { data } = await DATA_API.get(`/articles?title_like=${keyword}`);
    console.log('data', data);
    return data;
  };

  const {
    data: searched,
    isPending,
    error,
  } = useQuery({
    queryKey: ['articles', searchKeyword],
    queryFn: () => searchedArticles(searchKeyword),
  });

  if (isPending) return <p>로딩중</p>;
  if (error) return <p>에러: {error.message}</p>;

  return (
    <div>
      <ul>
        {searched?.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default SearchResults;
