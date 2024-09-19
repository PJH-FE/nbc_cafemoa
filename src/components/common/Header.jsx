import { Link, useNavigate } from 'react-router-dom';
import { AlignJustify, X, Search } from 'lucide-react';

import useUserStore from '../../zustand/bearStore';
import { useState, useEffect } from 'react';
import MainCategory from '../MainCategory';
import classNames from 'classnames';

const Header = () => {
  const { userInfo, removeUserInfo } = useUserStore();
  const handleLogout = () => {
    removeUserInfo();
    navigate('/');
  };

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴를 열고 닫는 상태값 저장
  const [activeTab, setActiveTab] = useState(null);

  const tabMenu = [
    {
      title: '피드보기',
      link: '/list',
    },
    {
      title: '내프로필',
      link: '/mypage',
    },
    {
      title: '북마크',
      link: '/bookmark',
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const tabMenuClick = index => {
    setActiveTab(index);
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-slate-300">
      <header className="flex lg:justify-between items-center lg:gap-3 px-6 h-[74px]">
        <div className="flex gap-2 sm:flex-[.55] sm:justify-between">
          <div onClick={toggleMenu} className="cursor-pointer">
            {isMenuOpen ? <X /> : <AlignJustify />}
          </div>
          <Link to="/">
            <div className="">logo</div>
          </Link>
        </div>
        <nav className="flex-1 hidden lg:block" style={{ height: 'inherit' }}>
          {/* 로그인상태에 따라 조건부스타일링 */}
          <ul className="flex gap-2 h-[100%]">
            {tabMenu.map((tab, index) => {
              return (
                <li
                  key={index}
                  className={classNames('flex items-center h-[100%] cursor-pointer relative', {
                    'before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-black':
                      activeTab === index,
                  })}
                  onClick={() => tabMenuClick(index)}
                >
                  <Link to={tab.link}>{tab.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex gap-2 sm:flex-[.45] sm:justify-end">
          <div className="cursor-pointer">
            <form>
              <input type="text" value={searchKeyword} onChange={handleChange} placeholder="검색" />
            </form>
          </div>
          {!userInfo ? (
            <>
              <Link className="hidden lg:block" to="/login">
                LOGIN
              </Link>
              <Link className="hidden lg:block" to="/signup">
                signup
              </Link>
            </>
          ) : (
            <button onClick={handleLogout}>LOGOUT</button>
          )}
        </div>
      </header>
      {isMenuOpen ? (
        <div className="sm:fixed sm:top-0 sm:left-0 sm:w-full sm:h:full sm:bg-black sm:bg-opacity-40">
          <div className="lg:absolute w-full sm:w-[70vw] sm:h-[100vh] sm:p-[20px] sm:flex sm:flex-col sm:gap-[20px] bg-white">
            <button onClick={toggleMenu} className="hidden sm:block">
              <X />{' '}
            </button>
            <div className="justify-between hidden sm:flex">
              <Link to="/login" onClick={toggleMenu}>
                <h2>로그인 해주세요!</h2>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                회원가입
              </Link>
            </div>
            <nav className="lg:flex-1 lg:hidden">
              {/* 로그인상태에 따라 조건부스타일링 */}
              <ul className="flex gap-2 h-[100%] sm:justify-around">
                {tabMenu.map((tab, index) => {
                  return (
                    <li key={index} className="flex items-center" onClick={() => tabMenuClick(index)}>
                      <Link to={tab.link} onClick={toggleMenu}>
                        {tab.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <MainCategory />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Header;
