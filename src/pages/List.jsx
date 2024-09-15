import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import SpotListItem from '../components/SpotListItem';
import { useLocation } from 'react-router-dom';

//데이터 가져오기
const getArticle = async () => {
  const { data } = await axios.get('http://localhost:888/article');
  return data;
};

const List = () => {
  const location = useLocation(); // URL 파라미터 읽기
  const queryParams = new URLSearchParams(location.search);
  const cateInLists = JSON.parse(decodeURIComponent(queryParams.get('cateInLists')));

  //어떤 데이터 쓸건지 지정
  const {
    data: articleData,
    isPending: articleIsPending,
    isError: articleIsError,
  } = useQuery({
    queryKey: ['article'],
    queryFn: getArticle,
  });

  if (articleIsPending) return <div>loding,,</div>;
  if (articleIsError) return <div>error,,</div>;

  //최신순 정렬
  const newSpots = articleData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <ul className="grid grid-cols-4">
        {newSpots.map(data => {
          return <SpotListItem key={data.id} data={data} />;
        })}
      </ul>
    </div>
  );
};
export default List;
