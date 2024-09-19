import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import SpotListItem from '../components/SpotListItem';
import { useState, useRef, useEffect } from 'react';

const List = () => {
  const [articles, setArticles] = useState([]); // 전체 데이터를 담을 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 체크하는 상태
  const itemsPerPage = 8; // 한 번에 보여줄 아이템 개수

  const fetchArticles = async page => {
    setLoading(true); //로딩상태 true로 변경
    try {
      const { data } = await axios.get(`http://localhost:888/article?page=${page}&limit=${itemsPerPage}`);

      const startIndex = page * itemsPerPage; // page * 8
      const endIndex = startIndex + itemsPerPage;
      const sliceData = data.slice(startIndex, endIndex);
      console.log('data', sliceData);

      if (data.length < itemsPerPage) {
        // 마지막일때
        setHasMore(false); // 더 불러올 데이터가 없음상태로 변경
      }
      setArticles(prevData => [...prevData, ...sliceData]);
    } catch (error) {
      console.error('Error', error);
    }
    setLoading(false); // 로딩상태 false로 변경
  };

  // 스크롤 이벤트
  const handleScroll = () => {
    if (
      // : 브라우저의 높이 + 스크롤된 높이 >= 문서의 높이 - 10 => 스크롤이 맨 아래에 도달했을 때
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10 &&
      hasMore &&
      !loading
    ) {
      setPage(prevPage => prevPage + 1); // 다음 페이지로 이동
    }
  };

  // 컴포넌트가 처음 로드될 때 , 페이지가 바뀔때마다 실행
  useEffect(() => {
    fetchArticles(page); // 데이터 가져오기
  }, [page]);

  // 스크롤 이벤트 추가
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트 될 때 이벤트 제거
  }, [loading, hasMore]);

  return (
    <div>
      <ul className="grid grid-cols-4 sm:grid-cols-2">
        {articles.map((article, index) => {
          return <SpotListItem key={index} data={article} />;
        })}
      </ul>
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more Posts</div>} {/* 모든 데이터를 다 불러왔을 때 */}
    </div>
  );
};
export default List;
