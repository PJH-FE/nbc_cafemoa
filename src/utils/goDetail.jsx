import { useNavigate } from 'react-router-dom';

//article 아이템클릭시 디테일페이지 이동
export const useDetailItemClick = () => {
  const navigate = useNavigate();

  const detailItemClick = id => {
    navigate(`/detail?article_id=${id}`);
  };

  return detailItemClick;
};
