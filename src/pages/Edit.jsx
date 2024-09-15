import { useNavigate, useSearchParams } from 'react-router-dom';
import ToastForm from '../components/board/ToastForm';
import { useDeletePost, useFetchDetail } from '../queries/boardQueries';

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPostId = searchParams.get('post_id');
  const { data, isPending, isError } = useFetchDetail();

  if (isPending) return;
  if (isError) return;
  const detailData = data.filter(post => post.id === nowPostId)[0];

  return (
    <>
      <div>Edit</div>
      <ToastForm content={detailData} />
    </>
  );
};
export default Edit;
