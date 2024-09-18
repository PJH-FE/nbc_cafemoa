import axios from 'axios';
import SpotListItem from '../components/SpotListItem';
import { useLocation } from 'react-router-dom';

const ListCategory = () => {
  const location = useLocation(); // URL 파라미터 읽기
  const queryParams = new URLSearchParams(location.search);
  const cateInLists = JSON.parse(decodeURIComponent(queryParams.get('cateInLists')));

  //최신순 정렬
  //   const LatestSpots = cateInLists.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   console.log('cateInLists', cateInLists);
  return (
    <div>
      <ul className="grid grid-cols-4 sm:grid-cols-2">
        {cateInLists.map(data => {
          return <SpotListItem key={data.id} data={data} />;
        })}
      </ul>
    </div>
  );
};
export default ListCategory;