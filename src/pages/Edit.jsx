import { useSearchParams } from 'react-router-dom';
import ToastForm from '../components/board/ToastForm';
import { useFetchDetail } from '../queries/boardQueries';

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPostId = searchParams.get('article_id');
  const { data, isPending, isError } = useFetchDetail(nowPostId);

  if (isPending) return;
  if (isError) return;

  return (
    <>
      <ToastForm content={data} isEdit={true} />
    </>
  );
};
export default Edit;
