import { useState, useEffect } from 'react';
import { DATA_API } from '../api/api';
import UserListItem from '../components/UserListItem';
import { useDetailItemClick } from '../utils/goDetail';

const UsersCommutity = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;

  const [endIndex, setEndIndex] = useState(12);

  // console.log('articles', articles);

  // 스크롤 이벤트
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10 &&
      hasMore &&
      !loading
    ) {
      setEndIndex(prevIndex => prevIndex + itemsPerPage);
    }
  };

  // 컴포넌트가 처음 로드될 때 , 페이지가 바뀔때마다 실행
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data } = await DATA_API.get(`/articles?_limit=${endIndex}`);
        if (itemsPerPage < data.length) {
          setHasMore(false);
        }
        setArticles(data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [endIndex]);

  // 스크롤 이벤트 추가
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트 될 때 이벤트 제거
  }, [loading, hasMore]);
  //추후 IntersectionObserver 로 변경하기,,

  //가나다순 버튼
  const alignmentBtn = () => {
    let articleData = [...articles];
    articleData.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
    setArticles(articleData);
  };

  //최신순
  const latestBtn = () => {
    let articleData = [...articles];
    articleData.sort((a, b) => new Date(b.date) - new Date(a.date));
    setArticles(articleData);
  };

  return (
    <div className="max-w-[1500px] my-0 mx-[auto]">
      <div className="flex justify-end gap-5 p-5">
        <button onClick={alignmentBtn}>가나다순</button>
        <button onClick={latestBtn}>최신순</button>
      </div>
      <ul className="grid gap-[20px] grid-cols-4 p-5 pt-[3%] sm:grid-cols-2 sm:gap-x-[10px] sm:gap-y-[50px]">
        {articles.map((article, index) => {
          return <UserListItem key={index} data={article} />;
        })}
      </ul>
      {loading && <div>Loading...</div>}
    </div>
  );
};
export default UsersCommutity;
