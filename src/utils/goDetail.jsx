import { useNavigate } from 'react-router-dom';

export const useDetailItemClick = () => {
  const navigate = useNavigate();

  //커뮤니티 아이템클릭시 카페소개페이지 이동
  const detailItemClick = id => {
    navigate(`/detail?article_id=${id}`);
  };

  //article 아이템클릭시 디테일페이지 이동
  const cafeInfoItemClick = id => {
    navigate(`/cafeinfo?id=${id}`);
  };

  return { detailItemClick, cafeInfoItemClick };
};
