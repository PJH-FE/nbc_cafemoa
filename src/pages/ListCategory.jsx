import SpotListItem from '../components/SpotListItem';
import { useLocation } from 'react-router-dom';

const ListCategory = () => {
  const location = useLocation(); // URL 파라미터 읽기
  const queryParams = new URLSearchParams(location.search);
  const cateInLists = JSON.parse(decodeURIComponent(queryParams.get('cateInLists')));

  return (
    <div className="max-w-[1500px] my-0 mx-[auto]">
      <ul className="grid gap-[20px] grid-cols-4 p-5 pt-[3%] sm:grid-cols-2 sm:gap-x-[10px] sm:gap-y-[50px]">
        {cateInLists.map(data => {
          return <SpotListItem key={data.id} data={data} />;
        })}
      </ul>
    </div>
  );
};
export default ListCategory;
