import { useNavigate } from 'react-router-dom';

export const useDetailItemClick = () => {
  const navigate = useNavigate();

  const detailItemClick = id => {
    navigate(`/detail?article_id=${id}`);
  };

  return detailItemClick;
};
