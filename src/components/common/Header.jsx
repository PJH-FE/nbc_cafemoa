import { Link, useNavigate } from 'react-router-dom';
import { AlignJustify, X, Search, LayoutGrid, User, Bookmark, MessagesSquare } from 'lucide-react';
import useUserStore from '../../zustand/bearStore';
import { useState, useEffect } from 'react';
import MainCategory from '../MainCategory';
import classNames from 'classnames';
import SearchInput from '../SearchInput';

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
      icon: <LayoutGrid />,
    },
    {
      title: '카페로그',
      link: '/users-commutity',
      icon: <MessagesSquare />,
    },
    {
      title: '내프로필',
      link: '/mypage',
      icon: <User />,
    },
    {
      title: '북마크',
      link: '/bookmark',
      icon: <Bookmark />,
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
            <Search />
            <SearchInput />
          </div>
          {!userInfo ? (
            <>
              <Link className="hidden lg:block" to="/login">
                로그인
              </Link>
              <Link className="hidden lg:block" to="/signup">
                회원가입
              </Link>
            </>
          ) : (
            <button className="hidden lg:block" onClick={handleLogout}>
              로그아웃
            </button>
          )}
        </div>
      </header>
      {isMenuOpen ? (
        <div className="sm:fixed sm:top-0 sm:left-0 sm:w-full sm:h:full sm:bg-black sm:bg-opacity-40">
          <div className="lg:absolute w-full sm:w-[70vw] sm:h-[100vh] sm:flex sm:flex-col sm:gap-[20px] bg-white">
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
                  <h2>
                    <span className="text-[#fff] text-[24px]">{userInfo.nickname}</span>님 안녕하세요!
                  </h2>
                  <button onClick={handleLogout} className="text-[#fff]">
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
