import useUserStore from '../zustand/bearStore';
import { useState } from 'react';
import BookmarkedList from '../components/BookmarkedList';

const Bookmark = () => {
  const { getUserInfo } = useUserStore();
  const { user_nickname } = getUserInfo();

  return (
    <div className="content">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-4 mb-6 border-b-4 border-primary01">
        <div>
          <h2 className="sub-title mb-[10px]">북마크</h2>
          <h2 className="text-[18px] text-[#858585]">{user_nickname}님이 북마크하신 카페 리스트입니다.</h2>
        </div>
      </div>

      <BookmarkedList />
    </div>
  );
};
export default Bookmark;
