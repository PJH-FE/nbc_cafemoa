import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAddBookmark, useDeletePost, useFetchDetail, useRemoveBookmark } from '../queries/boardQueries';
import Map from '../components/board/Map';
import { useEffect, useState } from 'react';
import { DATA_API } from '../api/api';

import useUserStore from '../zustand/bearStore';

const Detail = () => {
  const [searchParams] = useSearchParams();
  const nowArticleId = searchParams.get('article_id');
  const { data: detailData, isPending, isError } = useFetchDetail(nowArticleId);

  const delPost = useDeletePost();
  const navigate = useNavigate();

  const [WriterNickname, setWriterNickname] = useState('작성자');


  // 로그인 한 유저 정보
  const userInfo = useUserStore(state => state.getUserInfo());
  const [loginUserData, setLoginUserData] = useState();

  const addBookmark = useAddBookmark(setLoginUserData);
  const removeBookmark = useRemoveBookmark(setLoginUserData);

  useEffect(() => {
    if (userInfo) {
      const userId = userInfo.userId;
      const getUserDataId = async () => {
        const { data: userData, isError } = await DATA_API.get(`/users?user_id=${userId}`);
        if (isError) return;
        setLoginUserData({
          user_id: userData[0].id,
          isBookmarked: userData[0].bookmarked.includes(nowArticleId),
        });
      };
      getUserDataId();
    }
  }, []);


  if (isPending) return;
  if (isError) return;

  const cafeData = { cafe_name: detailData?.cafe_name, cafe_address: detailData?.cafe_address };

  // 작성자 ID 이용하여 닉네임 불러오기
  const userData = detailData?.author_id;
  const getWriterNickname = async () => {
    const { data: userNickname, isError } = await DATA_API.get(`/users/${userData}`);
    if (isError) return;
    setWriterNickname(userNickname.user_nickname);

  };
  getWriterNickname();

  // 결과 삭제
  const deletePostHandler = () => {
    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      delPost.mutate(nowArticleId);
      navigate('/');
    }
  };


  // 북마크 저장/삭제
  const clickBookmark = async bookmarkEvent => {
    await bookmarkEvent.mutate({ id: loginUserData.user_id, articleId: nowArticleId });
  };


  return (
    <>
      <div>
        <div className="flex items-center pb-4 text-3xl font-bold border-b-2 border-black">
          <span>[{detailData.category}]</span>
          {detailData.title}

          {userInfo && (
            <>
              {loginUserData?.isBookmarked ? (
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
              )}
            </>
          )}
        </div>
        <div className="flex flex-col px-3 py-2">
          <div className="pb-2 ml-auto text-gray-600">{detailData.date} / 작성자</div>
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
