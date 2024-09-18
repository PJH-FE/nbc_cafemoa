import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDeletePost, useFetchDetail } from '../queries/boardQueries';
import Map from '../components/board/Map';

const Detail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPostId = searchParams.get('post_id');
  const { data: detailData, isPending, isError } = useFetchDetail(nowPostId);
  const delPost = useDeletePost();
  const navigate = useNavigate();

  if (isPending) return;
  if (isError) return;
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
    <>
      <div>
        <div className="flex items-center font-bold text-3xl pb-4 border-b-2 border-black">
          <span>[{detailData.category}]</span>
          {detailData.title}
        </div>
        <div className="flex flex-col py-2 px-3">
          <div className="ml-auto pb-2 text-gray-600">{detailData.date} / 작성자</div>
          <div dangerouslySetInnerHTML={{ __html: detailData.content }}></div>
        </div>

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
    </>
  );
};
export default Detail;
