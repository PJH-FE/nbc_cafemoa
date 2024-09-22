import React, { useEffect, useState } from 'react';
import { useDetailItemClick } from '../utils/goDetail';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import useUserStore from '../zustand/bearStore';
import { useAddBookmark, useRemoveBookmark } from '../queries/boardQueries';
import { DATA_API } from '../api/api';
import { getCategoryColor } from '../utils/getCategoryColor';
import defaultUrl from '../assets/noimage.png';

const SpotListItem = ({ data }) => {
  const { cafeInfoItemClick, detailItemClick } = useDetailItemClick();
  const { closeMenu } = useUserStore();

  // 로그인 한 유저 정보
  const userInfo = useUserStore(state => state.getUserInfo());
  const { setUserInfo } = useUserStore();
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
          isBookmarked: userData[0].bookmarked.includes(data.id),
        });
      };
      getUserDataId();
    }
  }, []);

  // 북마크 저장/삭제
  const clickBookmark = async (bookmarkEvent, type) => {
    await bookmarkEvent.mutate({ id: loginUserData?.user_id, articleId: data.id });

    if (type === 'add') {
      setUserInfo({ bookmarked: [...userInfo.bookmarked, data.id] });
    } else {
      const nowBookmarked = userInfo.bookmarked.filter(item => item !== data.id);
      setUserInfo({ bookmarked: [...nowBookmarked] });
    }
  };

  const handleCafeInfoItem = () => {
    data.id.indexOf('cafedb') != -1 ? cafeInfoItemClick(data.id) : detailItemClick(data.id);
    closeMenu();
  };

  return (
    <div className="flex flex-col gap-[10px] w-full cursor-pointer " onClick={handleCafeInfoItem}>
      <div className="relative flex items-center justify-center w-full py-[62.25%] h-0 overflow-hidden">
        <img
          className="absolute z-10 object-cover min-w-full min-h-full"
          src={data.thumbnail ?? defaultUrl}
          alt={data.title}
        />

        <span className="absolute z-20 top-[10px] right-[10px]">
          {userInfo && (
            <>
              {loginUserData?.isBookmarked ? (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    clickBookmark(removeBookmark, 'remove');
                  }}
                >
                  <BookmarkCheck />
                </button>
              ) : (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    clickBookmark(addBookmark, 'add');
                  }}
                >
                  <Bookmark />
                </button>
              )}
            </>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2 justify-between border-black border-t-[1px] pt-4">
        <h2 className="font-bold text-xl">{data.title}</h2>
        <p className="font-normal flex-shrink-0 text-slate-500 text-base">{data.region}</p>
      </div>
      <span className="text-left text-base" style={{ color: getCategoryColor(data.category) }}>
        # {data.category}
      </span>
    </div>
  );
};

export default SpotListItem;
