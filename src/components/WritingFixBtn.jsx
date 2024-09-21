import React from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../zustand/bearStore';
import { useEffect } from 'react';

const WritingFixBtn = () => {
  const { closeMenu } = useUserStore();

  useEffect(() => {
    if (location.pathname === '/write') {
      closeMenu();
    }
  }, [location.pathname, closeMenu]);

  return (
    <div>
      <button className="fixed bottom-[3%] right-[3%] z-10 w-[80px] h-[80px] bg-black text-white rounded-full cursor-pointer">
        <Link to="/write">글쓰기</Link>
      </button>
    </div>
  );
};

export default WritingFixBtn;
