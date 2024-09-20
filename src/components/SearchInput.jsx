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
    navigate(`/search-results?keyword=${searchKeyword}`);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input type="text" value={searchKeyword} onChange={handleInputChange} placeholder="검색" />
      <button>검색</button>
    </form>
  );
};

export default SearchInput;
