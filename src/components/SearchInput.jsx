import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
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
    <form onSubmit={handleSearchSubmit} className="flex">
      <input
        className="focus: outline-none"
        type="text"
        value={searchKeyword}
        onChange={handleInputChange}
        placeholder="검색"
      />
      <button>
        <Search />
      </button>
    </form>
  );
};

export default SearchInput;
