import { Link, useSearchParams } from 'react-router-dom';
import { useDeletePost, useFetchDetail } from '../queries/boardQueries';
import Map from '../components/board/Map';

const Detail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPostId = searchParams.get('post_id');
  const { data, isPending } = useFetchDetail();
  const delPost = useDeletePost();

  if (isPending) return;
  const detailData = data.filter(post => post.id === nowPostId)[0];
  console.log(detailData);
  const cafeData = { cafeName: detailData?.cafe_name, cafeAddress: detailData?.cafe_address };

  // 결과 삭제
  const deletePostHandler = () => {
    delPost.mutate(nowPostId);
  };

  return (
    <div>
      <div>{detailData.category}</div>
      <div>{detailData.title}</div>
      <div dangerouslySetInnerHTML={{ __html: detailData.content }}></div>
      <div>{detailData.date}</div>
      <div>{detailData.cafe_name}</div>

      <Map cafeData={cafeData} />

      <Link to={`/edit?post_id${nowPostId}`}>수정</Link>
    </div>
  );
};
export default Detail;
