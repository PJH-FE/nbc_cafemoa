import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAddBookmark, useDeletePost, useFetchDetail, useRemoveBookmark } from '../queries/boardQueries';
import Map from '../components/board/Map';
import { useEffect, useState } from 'react';
import { DATA_API } from '../api/api';
import Comments from '../components/Comments';
import { Bookmark, BookmarkCheck } from 'lucide-react';

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
  const { setUserInfo } = useUserStore();
  const [loginUserData, setLoginUserData] = useState();

  const addBookmark = useAddBookmark(setLoginUserData, setUserInfo);
  const removeBookmark = useRemoveBookmark(setLoginUserData, setUserInfo);

  useEffect(() => {
    if (userInfo) {
      const userId = userInfo.user_id;
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
  const clickBookmark = async (bookmarkEvent, type) => {
    await bookmarkEvent.mutate({ id: loginUserData?.user_id, articleId: nowArticleId });

    if (type === 'add') {
      setUserInfo({ bookmarked: [...userInfo.bookmarked, nowArticleId] });
    } else {
      const nowBookmarked = userInfo.bookmarked.filter(item => item !== nowArticleId);
      setUserInfo({ bookmarked: [...nowBookmarked] });
    }
  };

  return (
    <>
      <div className="content">
        <div>
          <div className="flex items-center gap-2 px-3 pb-4 text-3xl font-bold border-b-2 border-primary01">
            <span>[{detailData.category}]</span>
            {detailData.title}
          </div>
          <div className="flex flex-col px-4 pb-4 border-b-2 border-primary01">
            <div className="py-4 ml-auto text-[#5c5c5c]">
              {WriterNickname} / {detailData.date}
            </div>
            <div dangerouslySetInnerHTML={{ __html: detailData.content }}></div>
            <div className="flex items-center justify-end gap-4 mt-20">
              {userInfo && (
                <>
                  {loginUserData?.isBookmarked ? (
                    <button
                      onClick={() => {
                        clickBookmark(removeBookmark, 'remove');
                      }}
                    >
                      <BookmarkCheck size={42} strokeWidth={1} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        clickBookmark(addBookmark, 'add');
                      }}
                    >
                      <Bookmark size={42} strokeWidth={1} />
                    </button>
                  )}

                  {userData === loginUserData?.user_id && (
                    <>
                      <Link
                        to={`/edit?article_id=${nowArticleId}`}
                        className="block py-1 px-6 w-fit font-bold text-lg text-primary01 border-2 border-primary01 rounded-lg"
                      >
                        수정
                      </Link>

                      <button
                        onClick={() => {
                          deletePostHandler();
                        }}
                        className="block py-1 px-6 w-fit font-bold text-lg text-white border-2 border-primary01 rounded-lg bg-primary01"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="cafe-map mt-[120px]">
            <div className="address mb-10">
              <div className="text-4xl font-bold">&apos;{detailData.cafe_name}&apos; 찾아오시는 길</div>
              <span className="block text-xl mt-3">{detailData.cafe_address}</span>
            </div>
            <Map cafeData={cafeData} />
          </div>
        </div>

        <div className="mt-8">
          <Comments nowArticleId={nowArticleId} />
        </div>
      </div>
    </>
  );
};
export default Detail;
