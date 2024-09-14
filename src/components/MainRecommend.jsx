import React from 'react';
import SpotListItem from './SpotListItem';
import { ChevronRight } from 'lucide-react';

const articleMockData = [
  {
    id: 1,
    category: '모각코',
    title: '투썸',
    content: '분위기가 좋고 커피가 맛있는곳',
    author_id: 123,
    date: '2024-09-11',
    cafe_address: '서울특별시 강동구',
    region: '서울',
  },
  {
    id: 2,
    category: '뷰맛집',
    title: '카페 온도',
    content: '뷰가 예뻐요!',
    author_id: 456,
    date: '2024-09-11',
    cafe_address: '서울특별시 강남구',
    region: '서울',
  },
  {
    id: 3,
    category: '모각코',
    title: '스타벅스',
    content: '일하기 좋은곳~~',
    author_id: 789,
    date: '2024-09-13',
    cafe_address: '충청북도 대전광역시',
    region: '충청도',
  },
  {
    id: 4,
    category: '디저트맛집',
    title: '커피빈',
    content: '여기 베이글 존맛',
    author_id: 2356,
    date: '2024-09-14',
    cafe_address: '전라북도 익산시',
    region: '전라도',
  },
  {
    id: 5,
    category: '24시',
    title: '24시카페',
    content: '우아 24시에요~!!',
    author_id: 7645,
    date: '2024-09-15',
    cafe_address: '경기도 성남시',
    region: '경기도',
  },
];

const MainRecommend = () => {
  //최신순 정렬 후 4개만 뽑기
  const newSpots = articleMockData.sort((a, b) => new Date(b.date) - new Date(a.date));
  const top4NewSpot = newSpots.slice(0, 4);

  return (
    <div className="flex flex-col gap-[20px] p-[20px] max-w-[1500px] w-full mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px]">오늘의 카페</h2>
        <span className="flex items-center gap-[5px] cursor-pointer">
          전체보기
          <ChevronRight />
        </span>
      </div>
      <div className="flex w-[100%] gap-[20px]">
        {top4NewSpot.map(data => {
          return <SpotListItem key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
};

export default MainRecommend;
