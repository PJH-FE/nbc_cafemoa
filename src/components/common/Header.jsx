import { Link } from 'react-router-dom';
import { AlignJustify, X, Search } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴를 열고 닫는 상태값 저장

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // 열고 닫는 메뉴의 이전 상태값을 반환하도록 설정
  };

  return (
    <div className="border-b border-slate-300 sticky">
      <header className="flex justify-between items-center gap-3 px-6 h-[74px]">
        <div className="flex gap-2">
          <div onClick={toggleMenu} className="cursor-pointer">
            {isMenuOpen ? <X /> : <AlignJustify />}
          </div>
          <Link to="/">
            <div className="">logo</div>
          </Link>
        </div>
        <nav className="flex-1" style={{ height: 'inherit' }}>
          {/* 로그인상태에 따라 조건부스타일링 */}
          <ul className="flex gap-2 h-[100%]">
            <li className="flex items-center h-[100%] cursor-pointer">피드보기</li>
            <li className="flex items-center h-[100%] cursor-pointer">내프로필</li>
            <li className="flex items-center h-[100%] cursor-pointer">북마크</li>
          </ul>
        </nav>
        <div className="flex gap-2">
          <div className="cursor-pointer">
            <Search />
          </div>
          {/* 로그인상태에 따라 조건부스타일링 */}
          <Link to="/login">LOGIN</Link>
          <Link to="/singup">SING UP</Link>
        </div>
      </header>
      {isMenuOpen ? (
        <div className="absolute w-[100%]" style={{ backgroundColor: 'red' }}>
          카테고리메뉴
        </div>
      ) : null}
    </div>
  );
};
export default Header;
