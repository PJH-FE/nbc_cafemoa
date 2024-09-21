import { CircleChevronDown, CircleChevronUp, SquarePen } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../zustand/bearStore';

const WritingFixBtn = () => {
  const userInfo = useUserStore(state => state.getUserInfo());
  console.log(userInfo);

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleGoToBottom = () => {
    window.scrollTo({
      top: document.getElementById('root').scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed gap-1 bottom-[3%] right-[3%] z-50 flex flex-col items-center">
      <CircleChevronUp size={48} onClick={() => handleGoToTop()} className="cursor-pointer" />
      <CircleChevronDown size={48} onClick={() => handleGoToBottom()} className="cursor-pointer" />

      {userInfo && (
        <Link
          to="/write"
          className="flex items-center justify-center w-[48px] h-[48px] bg-black text-white rounded-full cursor-pointer text-base"
        >
          <SquarePen size={24} />
        </Link>
      )}
    </div>
  );
};

export default WritingFixBtn;
