import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SpotListItem from './SpotListItem';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DATA_API } from '../api/api';
import useUserStore from '../zustand/bearStore';

const MainRecommend = () => {
  const [cateInLists, setCateInLists] = useState([]); //필터링된 리스트 상태저장
  const navigate = useNavigate();
  const { closeMenu } = useUserStore();

  //어떤 데이터 쓸건지 지정
  const {
    data: cafeDbData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['cafedb'],
    queryFn: async () => {
      const { data } = await DATA_API.get('/cafedb');
      return data;
    },
  });

  if (isPending) return <div>loding,,</div>;
  if (isError) return <div>error,,</div>;

  // 현재 날짜 가져오기
  const today = new Date();
  // 7일 이내 신규글 확인
  const filterCateInList = cafeDbData.filter(list => {
    const articleDate = new Date(list.date);
    const diffTime = Math.abs(today - articleDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  //최신순 정렬 후 4개만 뽑기
  const top4LatestSpots = filterCateInList.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  const openListHandle = () => {
    setCateInLists(filterCateInList);
    const cateInListsParam = encodeURIComponent(JSON.stringify(filterCateInList));
    navigate(`/list-category?cateInLists=${cateInListsParam}`);
    closeMenu();
  };
  return (
    <div className="flex flex-col gap-[40px] px-6 py-[100px] max-w-[1500px] w-full mx-auto ">
      <div className="flex items-center justify-between">
        <h2 className="sub-title">새로운 카페</h2>
        <span className="flex items-center gap-[5px] cursor-pointer" onClick={openListHandle}>
          전체보기
          <ChevronRight />
        </span>
      </div>
      {/* pc */}
      <div className="hidden lg:block">
        <ul className="grid grid-cols-4 w-full gap-6">
          {top4LatestSpots.map(data => {
            // 클릭시 해당디테일페이지로 이동
            return <SpotListItem key={data.id} data={data} />;
          })}
        </ul>
      </div>
      {/* mo */}
      <div className="hidden overflow-hidden sm:block">
        <Swiper slidesPerView={'auto'} spaceBetween={20} className="mySwiper w-[100%]">
          {top4LatestSpots.map((data, index) => {
            return (
              <SwiperSlide
                key={index}
                className="swiper-slide swiper-slide-next text-center text-[18px] w-[80%] flex justify-center items-center"
              >
                <SpotListItem key={index} data={data} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MainRecommend;
