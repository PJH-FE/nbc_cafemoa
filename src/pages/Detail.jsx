import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  useAddBookmark,
  useDeletePost,
  useFetchDetail,
  useFetchUser,
  useRemoveBookmark,
} from '../queries/boardQueries';
import Map from '../components/board/Map';
import { useState } from 'react';
import { DATA_API } from '../api/api';
const Detail = () => {
  const userId = JSON.parse(localStorage.getItem('user-storage')).state.userInfo?.userId;
  const [userNickname, setUserNickname] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const nowArticleId = searchParams.get('article_id');
  const { data: detailData, isPending, isError } = useFetchDetail(nowArticleId);
  const { data: userData } = useFetchUser(userId);
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();
  const delPost = useDeletePost();
  const navigate = useNavigate();
  if (isPending) return;
  if (isError) return;
  const cafeData = { cafe_name: detailData?.cafe_name, cafe_address: detailData?.cafe_address };

  const writerData = detailData?.author_id;

  const getNickname = async () => {
    const { data: userNickname, isError: userMissing } = await DATA_API.get(`/users/${writerData}`);

    setUserNickname(userNickname.user_nickname);
  };
  getNickname();

  const isBookmarked = userData.bookmarked.includes(nowArticleId);
  const clickBookmark = bookmarkEvent => {
    bookmarkEvent.mutate({ id: userId, articleId: nowArticleId });
  };

  // 결과 삭제
  const deletePostHandler = () => {
    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      delPost.mutate(nowArticleId);
      navigate('/');
    }
  };
  return (
    <>
      <div>
        <div className="flex items-center font-bold text-3xl pb-4 border-b-2 border-black">
          <span>[{detailData.category}]</span>
          {detailData.title}
          {/*
          {isBookmarked ? (
            <button
              onClick={() => {
                clickBookmark(removeBookmark);
              }}
            >
              북마크 함
            </button>
          ) : (
            <button
              onClick={() => {
                clickBookmark(addBookmark);
              }}
            >
              북마크 안 함
            </button>
          )} */}
        </div>
        <div className="flex flex-col py-2 px-3">
          <div className="ml-auto pb-2 text-gray-600">
            {detailData.date} / {userNickname}
          </div>
          <div dangerouslySetInnerHTML={{ __html: detailData.content }}></div>
        </div>
        <div>{detailData.cafe_name}</div>
        <Map cafeData={cafeData} />
        <Link to={`/edit?article_id=${nowArticleId}`}>수정</Link>
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
