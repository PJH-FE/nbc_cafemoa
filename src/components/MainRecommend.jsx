import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SpotListItem from './SpotListItem';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DATA_API } from '../api/api';

//데이터 가져오기
const getArticle = async () => {
  const { data } = await DATA_API.get('/articles');
  return data;
};

const MainRecommend = () => {
  const [cateInLists, setCateInLists] = useState([]); //필터링된 리스트 상태저장
  const navigate = useNavigate();

  //어떤 데이터 쓸건지 지정
  const {
    data: articleData,
    isPending: articleIsPending,
    isError: articleIsError,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticle,
  });

  if (articleIsPending) return <div>loding,,</div>;
  if (articleIsError) return <div>error,,</div>;

  // 현재 날짜 가져오기
  const today = new Date();
  // 7일 이내 신규글 확인
  const filterCateInList = articleData.filter(list => {
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
  };

  return (
    <div className="flex flex-col gap-[20px] p-[20px] max-w-[1500px] w-full mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px]">새로운 카페</h2>
        <span className="flex items-center gap-[5px] cursor-pointer" onClick={openListHandle}>
          전체보기
          <ChevronRight />
        </span>
      </div>
      {/* pc */}
      <div className="hidden lg:flex w-[100%] gap-[20px]">
        {top4LatestSpots.map(data => {
          // 클릭시 해당디테일페이지로 이동
          return <SpotListItem key={data.id} data={data} />;
        })}
      </div>
      {/* mo */}
      <div className="pl-[12vw] overflow-hidden hidden sm:block">
        <Swiper slidesPerView={'auto'} spaceBetween={20} className="mySwiper w-[100%] h-[800px]">
          {top4LatestSpots.map((data, index) => {
            return (
              <SwiperSlide
                key={index}
                className="swiper-slide swiper-slide-next text-center text-[18px] bg-slate-50 w-[80%] flex justify-center items-center"
              >
                <div>{data.title}</div>
                <div>{data.region}</div>
                <div>{data.date}</div>
                <div>{data.category}</div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MainRecommend;
