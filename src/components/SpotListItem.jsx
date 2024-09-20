import React, { useEffect, useState } from 'react';
import { useDetailItemClick } from '../utils/goDetail';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import useUserStore from '../zustand/bearStore';
import { useAddBookmark, useRemoveBookmark } from '../queries/boardQueries';
import { DATA_API } from '../api/api';

const SpotListItem = ({ data }) => {
  const detailItemClick = useDetailItemClick();

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
          isBookmarked: userData[0].bookmarked.includes(data.id),
        });
      };
      getUserDataId();
    }
  }, []);

  // 북마크 저장/삭제
  const clickBookmark = async bookmarkEvent => {
    await bookmarkEvent.mutate({ id: loginUserData?.user_id, articleId: data.id });
  };

  return (
    <div
      className="flex flex-col gap-[10px] w-full h-full cursor-pointe "
      onClick={() => detailItemClick(data.id)}
    >
      <div className="relative w-full h-full max-h-[400px]">
        <img className="object-cover w-full h-full" src={data.thumbnail} alt={data.title} />
        <span className="absolute top-[10px] right-[10px]">
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
        </span>
      </div>
      <div className="flex items-center justify-between border-black border-t-[1px] pt-[20px]">
        <h2 className="font-semibold">{data.title}</h2>
        <p className="font-normal text-slate-500 text-[13px]">{data.region}</p>
      </div>
      <span># {data.category}</span>
    </div>
  );
};

export default SpotListItem;
