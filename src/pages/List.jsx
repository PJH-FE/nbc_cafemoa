import SpotListItem from '../components/SpotListItem';
import { useState, useEffect } from 'react';
import { DATA_API } from '../api/api';

const List = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;

  const [endIndex, setEndIndex] = useState(itemsPerPage);

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
        const { data } = await DATA_API.get(`/cafedb?_limit=${endIndex}`);
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
  }, []);

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

  // 처음 렌더링될 때 최신순으로 정렬
  useEffect(() => {
    latestBtn();
  }, []);
  return (
    <div className="content">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-4 mb-6 border-b-4 border-primary01">
        <div>
          <h2 className="sub-title mb-[10px]">모아보기</h2>
          <h2 className="text-[18px] text-[#858585]">카페모아가 제공하는 카페정보들을 확인해보세요.</h2>
        </div>

        <div className="flex justify-end gap-5 ml-auto text-[#61443A]">
          <button onClick={alignmentBtn}>가나다순</button>
          <button onClick={latestBtn}>최신순</button>
        </div>
      </div>

      <ul className="grid gap-y-[50px] gap-x-[10px] grid-cols-4 sm:grid-cols-2 sm:gap-x-[10px] sm:gap-y-[50px]">
        {articles.map((article, index) => {
          return <SpotListItem key={index} data={article} />;
        })}
      </ul>
      {loading && <div>Loading...</div>}
    </div>
  );
};
export default List;
