import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      toast.error('검색어를 입력해주세요.');
    }
    setSearchKeyword('');
  };

  return (
    <>
      <div className="hidden lg:flex">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            className="focus: outline-none border-b border-[#61443A] text-[#61443A]"
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
        <div className="hidden sm:flex absolute top-[100%] left-0 z-50 w-full p-2 items-center justify-center bg-white border-t-[1px] border-primary01 shadow-[0_17px_15px_-5px_rgba(0,0,0,0.3)]">
          <form onSubmit={handleSearchSubmit} className="flex w-full p-2 items-center justify-center">
            <input
              className="focus: outline-none w-full px-4 py-2 border rounded-md text-[#61443A]"
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
