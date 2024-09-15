import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDeletePost, useFetchDetail } from '../queries/boardQueries';
import Map from '../components/board/Map';

const Detail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPostId = searchParams.get('post_id');
  const { data, isPending, isError } = useFetchDetail();
  const delPost = useDeletePost();
  const navigate = useNavigate();

  if (isPending) return;
  if (isError) return;
  const detailData = data.filter(post => post.id === nowPostId)[0];
  const cafeData = { cafe_name: detailData?.cafe_name, cafe_address: detailData?.cafe_address };

  // 결과 삭제
  const deletePostHandler = () => {
    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      delPost.mutate(nowPostId);
      navigate('/');
    }
  };

  return (
    <div>
      <div>{detailData.category}</div>
      <div>{detailData.title}</div>
      <div dangerouslySetInnerHTML={{ __html: detailData.content }}></div>
      <div>{detailData.date}</div>
      <div>{detailData.cafe_name}</div>

      <Map cafeData={cafeData} />

      <Link to={`/edit?post_id=${nowPostId}`}>수정</Link>
      <button
        onClick={() => {
          deletePostHandler();
        }}
      >
        삭제
      </button>
    </div>
  );
};
export default Detail;
