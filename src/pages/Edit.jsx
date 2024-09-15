import { useSearchParams } from 'react-router-dom';
import ToastForm from '../components/board/ToastForm';
import { useFetchDetail } from '../queries/boardQueries';

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPostId = searchParams.get('post_id');
  const { data, isPending, isError } = useFetchDetail(nowPostId);

  if (isPending) return;
  if (isError) return;

  return (
    <>
      <div>Edit</div>
      <ToastForm content={data} isEdit={true} />
    </>
  );
};
export default Edit;
