import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = ({ isSearchOpen, setIsSearchOpen }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();

  const handleInputChange = e => {
    setSearchKeyword(e.target.value);
  };
  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchKeyword) {
      navigate(`/search-results?keyword=${searchKeyword}`);
    } else {
      alert('검색어를 입력해주세요.');
    }
    setSearchKeyword('');
  };

  return (
    <>
      <div className="hidden lg:flex">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            className="focus: outline-none border-b border-[#61443A]"
            type="text"
            value={searchKeyword}
            onChange={handleInputChange}
            placeholder="검색"
          />
          <button>
            <Search />
          </button>
        </form>
      </div>

      {/* 작은화면 */}
      <div className="hidden sm:flex items-center">
        <button onClick={() => setIsSearchOpen(!isSearchOpen)}>{!isSearchOpen ? <Search /> : <X />}</button>
      </div>

      {isSearchOpen && (
        <div className="fixed top-[1.6rem] left-0 z-50 flex w-full mt-4 p-2 items-center justify-center">
          <form onSubmit={handleSearchSubmit} className="flex w-full mt-4 p-2 items-center justify-center">
            <input
              className="focus: outline-none focus:ring-blue-500 w-full px-4 py-2 border rounded-md"
              type="text"
              value={searchKeyword}
              onChange={handleInputChange}
              placeholder="검색"
            />
            <button>
              <Search />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SearchInput;
