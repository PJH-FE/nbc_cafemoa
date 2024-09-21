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
    <div className="max-w-[1500px] my-0 mx-[auto] pb-[100px] sm:pb-[50px]">
      <div className="pt-[60px] pb-[40px] sm:px-[20px]">
        <h2 className="text-[24px] font-bold mb-[10px]">카페로그</h2>
        <h2 className="text-[18px] text-[#858585]">카페에서의 일상과 경험을 기록해보세요.</h2>
      </div>
      <div className="flex justify-end gap-5 p-5 text-[#61443A]">
        <button onClick={alignmentBtn}>가나다순</button>
        <button onClick={latestBtn}>최신순</button>
      </div>
      <ul className="grid gap-[20px] grid-cols-1 p-5 pt-[3%]">
        {articles.map((article, index) => {
          return <UserListItem key={index} data={article} />;
        })}
      </ul>
      {loading && <div>Loading...</div>}
    </div>
  );
};
export default UsersCommutity;
