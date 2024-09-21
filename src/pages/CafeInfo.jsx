import { Link, useSearchParams } from 'react-router-dom';
import { useAddBookmark, useFetchCafeInfo, useRemoveBookmark } from '../queries/boardQueries';
import Map from '../components/board/Map';
import Comments from '../components/Comments';
import useUserStore from '../zustand/bearStore';
import { useEffect, useState } from 'react';
import { DATA_API } from '../api/api';
import { Bookmark, BookmarkCheck, Clock, Phone } from 'lucide-react';
import instaIcon from '../assets/insta.png';

const CafeInfo = () => {
  const [searchParams] = useSearchParams();
  const nowCafeId = searchParams.get('id');
  const { data: cafeInfo, isPending, isError } = useFetchCafeInfo(nowCafeId);

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
          isBookmarked: userData[0].bookmarked.includes(nowCafeId),
        });
      };
      getUserDataId();
    }
  }, []);

  // 북마크 저장/삭제
  const clickBookmark = async (bookmarkEvent, type) => {
    await bookmarkEvent.mutate({ id: loginUserData?.user_id, articleId: nowCafeId });

    if (type === 'add') {
      setUserInfo({ bookmarked: [...userInfo.bookmarked, nowCafeId] });
    } else {
      const nowBookmarked = userInfo.bookmarked.filter(item => item !== nowCafeId);
      setUserInfo({ bookmarked: [...nowBookmarked] });
    }
  };

  if (isPending) return;
  if (isError) return;

  const cafeData = { cafe_name: cafeInfo?.title, cafe_address: cafeInfo?.cafe_address };

  return (
    <>
      <div className="content">
        <div className="flex gap-20 flex-wrap items-start sm:gap-6">
          <div className="w-full lg:max-w-[calc(50%-2.5rem)] flex-shrink-0 ">
            <span className="flex items-center relative h-0 py-[50%]  rounded-lg overflow-hidden">
              <img className="object-cover min-h-full min-w-full" src={cafeInfo.thumbnail} alt="thumbnail" />
            </span>
          </div>

          <div className="w-full lg:max-w-[calc(50%-2.5rem)] flex-shrink-0 shadow-[0_4px_15px_1px_rgba(0,0,0,0.25)] rounded-lg p-10 sm:p-4">
            <div className="flex justify-between items-center mb-5">
              <div className="w-fit rounded text-[18px] py-1 px-3 font-bold text-primary01 bg-primary03">
                {cafeInfo.category}
              </div>

              {userInfo && (
                <>
                  {loginUserData?.isBookmarked ? (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        clickBookmark(removeBookmark, 'remove');
                      }}
                    >
                      <BookmarkCheck size={32} strokeWidth={1} />
                    </button>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        clickBookmark(addBookmark, 'add');
                      }}
                    >
                      <Bookmark size={32} strokeWidth={1} />
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-4 text-3xl font-bold">
              {cafeInfo.title}
              {cafeInfo.sns && (
                <Link to={cafeInfo.sns} target="_blank" className="block w-6">
                  <img src={instaIcon} alt="insta" className="w-full" />
                </Link>
              )}
            </div>

            <div className="text-base text-[#5c5c5c] mt-2 mb-6">{cafeInfo.cafe_address}</div>

            <div className="flex items-start gap-4 leading-7">
              <span className="flex items-center gap-2 min-w-[100px] text-xl font-bold">
                <Phone size={18} />
                Phone
              </span>
              <span className="text-lg">{cafeInfo.phone}</span>
            </div>

            <div className="flex items-start gap-4 mt-3">
              <span className="flex items-center gap-2 min-w-[100px] text-xl font-bold">
                <Clock size={18} /> Hours
              </span>
              <div className="text-lg">
                {Object.keys(cafeInfo.openingHours).map(day => {
                  return (
                    <div key={day} className="leading-7">
                      {day} : {cafeInfo.openingHours[day]}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="cafe-map mt-[120px] pt-[60px] border-t-4 border-primary03">
          <div className="address mb-10">
            <div className="text-4xl font-bold">&apos;{cafeInfo.title}&apos; 찾아오시는 길</div>
            <span className="block text-xl mt-3">{cafeInfo.cafe_address}</span>
          </div>
          <Map cafeData={cafeData} />
        </div>
        <div className="mt-8">
          <Comments nowArticleId={nowCafeId} />
        </div>
      </div>
    </>
  );
};
export default CafeInfo;
