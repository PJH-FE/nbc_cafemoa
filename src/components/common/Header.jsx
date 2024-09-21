import { Link, useNavigate } from 'react-router-dom';
import { AlignJustify, X, LayoutGrid, User, Bookmark, MessagesSquare, Search } from 'lucide-react';
import useUserStore from '../../zustand/bearStore';
import { useState, useEffect } from 'react';
import MainCategory from '../MainCategory';
import classNames from 'classnames';
import SearchInput from '../SearchInput';

const Header = () => {
  const { userInfo, removeUserInfo, closeMenu, toggleMenu, isMenuOpen, activeTab, setActiveTab, removeTab } =
    useUserStore();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    removeUserInfo();
    navigate('/');
    closeMenu();
  };

  const tabMenuClick = index => {
    setActiveTab(index);
    closeMenu();
  };

  const tabMenu = [
    {
      title: '피드보기',
      link: '/list',
      icon: <LayoutGrid />,
    },
    {
      title: '카페로그',
      link: '/users-commutity',
      icon: <MessagesSquare />,
    },
    {
      title: '마이페이지',
      link: '/mypage',
      icon: <User />,
    },
    {
      title: '북마크',
      link: '/bookmark',
      icon: <Bookmark />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = event => {
      const tabMenuElement = document.querySelector('.tab-menu');
      if (tabMenuElement && !tabMenuElement.contains(event.target)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setActiveTab]);

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
      closeMenu();
      removeTab();
    }
  }, [location.pathname, closeMenu, removeTab]);

  return (

    <div className="sticky top-0 z-10 bg-white border-b border-slate-300">
      <header className="flex justify-between items-center lg:gap-[30px] px-6 h-[74px]">
        <div className="flex gap-[20px] items-center  sm:justify-between">
          <div onClick={toggleMenu} className="cursor-pointer">
            {isMenuOpen ? <X /> : <AlignJustify />}
          </div>
        </div>
        <nav className="items-center flex-1 hidden lg:flex gap-[30px] tab-menu" style={{ height: 'inherit' }}>
          <Link to="/">
            <div className="font-hakgyo text-[1.5rem] text-[#61443A]">CAFEMOA</div>
          </Link>
          <ul className="flex gap-2 h-[100%]">
            {tabMenu.map((tab, index) => {
              return (
                <li
                  key={index}
                  className={classNames('flex items-center h-[100%] cursor-pointer relative', {
                    'before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-black':
                      activeTab === index,
                    hidden: index === 2,
                  })}
                  onClick={() => tabMenuClick(index)}
                >
                  <Link to={tab.link}>{tab.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link to="/" className="hidden sm:block">
          <div className="font-hakgyo text-[1.5rem] text-[#61443A]">CAFEMOA</div>
        </Link>
        <div className="flex gap-[10px] sm:justify-end">
          <SearchInput isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

          {!userInfo ? (
            <>
              <Link className="hidden lg:block" to="/login">
                Login
              </Link>
              <Link className="hidden lg:block" to="/signup">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button className="hidden lg:block" onClick={handleLogout}>
                Logout
              </button>
              <Link className="hidden lg:block" to="/mypage">
                Mypage
              </Link>
            </>
          )}
        </div>
      </header>
      {isMenuOpen ? (
        <div
          className="sm:fixed sm:top-0 sm:left-0 sm:w-full sm:h:full sm:bg-black sm:bg-opacity-40"
          onClick={closeMenu}
        >
          <div className="lg:absolute w-full h-[300px] sm:w-[90vw] sm:h-[100vh] sm:flex sm:flex-col sm:gap-[20px] bg-white">
            <div className="sm:px-[50px] sm:pt-[30px] sm:pb-[50px] flex flex-col bg-[#61443A] gap-[30px]">
              <button onClick={toggleMenu} className="justify-end hidden sm:flex">
                <X className="text-[#fff]" />
              </button>
              {!userInfo ? (
                <div className="items-center justify-between hidden py-[20px] sm:flex">
                  <Link to="/login" onClick={toggleMenu}>
                    <h2 className="text-[#fff] text-[24px]">로그인 해주세요!</h2>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={toggleMenu}
                    className="text-[#fff] text-[13px] py-[5px] px-[8px] border border-white rounded-[18px]"
                  >
                    회원가입
                  </Link>
                </div>
              ) : (
                <div className="items-center justify-between hidden sm:flex">
                  <h2 className="text-[#fff] text-[24px]">
                    <span className="text-[#fff] text-[24px]">{userInfo.user_nickname}</span>님 안녕하세요!
                  </h2>
                  <button
                    onClick={handleLogout}
                    className="text-[#fff] text-[13px] py-[5px] px-[8px] border border-white rounded-[18px]"
                  >
                    로그아웃
                  </button>
                </div>
              )}

              <nav className=" lg:hidden">
                <ul className="flex gap-2 h-[100%] pt-[20px] sm:justify-between">
                  {tabMenu.map((tab, index) => {
                    return (
                      <li key={index} className="flex items-center" onClick={() => tabMenuClick(index)}>
                        <Link
                          to={tab.link}
                          onClick={toggleMenu}
                          className="flex flex-col gap-[10px] items-center"
                        >
                          <span className="text-[#fff]">{tab.icon}</span>
                          <p className="text-[#fff]">{tab.title}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <MainCategory />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Header;
