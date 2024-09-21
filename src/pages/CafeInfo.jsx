import { Link, useSearchParams } from 'react-router-dom';
import { useAddBookmark, useFetchCafeInfo, useRemoveBookmark } from '../queries/boardQueries';
import Map from '../components/board/Map';
import useUserStore from '../zustand/bearStore';
import { useEffect, useState } from 'react';
import { DATA_API } from '../api/api';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const CafeInfo = () => {
  const [searchParams] = useSearchParams();
  const nowCafeId = searchParams.get('id');
  const { data: cafeInfo, isPending, isError } = useFetchCafeInfo(nowCafeId);

  // 로그인 한 유저 정보
  const userInfo = useUserStore(state => state.getUserInfo());
  const [loginUserData, setLoginUserData] = useState();

  const addBookmark = useAddBookmark(setLoginUserData);
  const removeBookmark = useRemoveBookmark(setLoginUserData);

  useEffect(() => {
    if (userInfo) {
      const userId = userInfo.user_id;
      const getUserDataId = async () => {
        const { data: userData, isError } = await DATA_API.get(`/users?user_id=${userId}`);
        if (isError) return;
        setLoginUserData({
          user_id: userData[0].id,
          isBookmarked: userData[0].bookmarked.includes(nowCafeId),
        });
      };
      getUserDataId();
    }
  }, []);

  // 북마크 저장/삭제
  const clickBookmark = async bookmarkEvent => {
    await bookmarkEvent.mutate({ id: loginUserData?.user_id, articleId: nowCafeId });
  };

  if (isPending) return;
  if (isError) return;

  const cafeData = { cafe_name: cafeInfo?.title, cafe_address: cafeInfo?.cafe_address };

  return (
    <>
      <div className="cafe-wrap max-w-[1500px] mx-auto py-20">
        <div className="cafe-info flex justify-center gap-10 w-4/5 mx-auto">
          <div className="thumbnail w-3/6">
            <img src={cafeInfo.thumbnail} alt="thumbnail" />
          </div>

          <div className="info-box flex flex-col w-1/2 py-6">
            <div className="mb-2 text-base">{cafeInfo.category}</div>
            <div>
              {userInfo && (
                <>
                  {loginUserData?.isBookmarked ? (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        clickBookmark(removeBookmark);
                      }}
                    >
                      <BookmarkCheck />
                    </button>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        clickBookmark(addBookmark);
                      }}
                    >
                      <Bookmark />
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="text-2xl font-bold">{cafeInfo.title}</div>
            {cafeInfo.sns && (
              <div className="flex mt-3">
                <span className="inline-block min-w-20">SNS</span>
                <Link to={cafeInfo.sns} target="_blank">
                  {cafeInfo.sns}
                </Link>
              </div>
            )}
            <div className="flex mt-3">
              <span className="inline-block min-w-20">Phone</span> {cafeInfo.phone}
            </div>
            <div className="flex mt-3">
              <span className="inline-block min-w-20">Hours</span>
              <div>
                {Object.keys(cafeInfo.openingHours).map(day => {
                  return (
                    <div key={day}>
                      {day} : {cafeInfo.openingHours[day]}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="cafe-map mt-20">
          <div className="address mb-6">
            <div className="text-4xl font-bold">찾아오시는 길</div>
            <span className="block text-xl mt-4">{cafeInfo.cafe_address}</span>
          </div>
          <Map cafeData={cafeData} />
        </div>
      </div>
    </>
  );
};
export default CafeInfo;
