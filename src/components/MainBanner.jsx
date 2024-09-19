import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/cateListHandle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DATA_API } from '../api/api';
import { useQuery } from '@tanstack/react-query';

const mainBannerCate = ['뷰맛집', '24시', '디저트맛집'];

const MainBanner = () => {
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const setCateInLists = []; //필터링된 리스트 저장
  const filterText = 'category'; //필터링된 리스트 저장
  const navigate = useNavigate();

  //article 데이터 전체 가져오기
  const {
    data: articleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data } = await DATA_API.get('/articles');
      return data;
    },
  });

  useEffect(() => {
    if (articleData) {
      setArticleAllData(articleData);
    }
  }, [articleData]);

  //util : 필터링 함수호출
  const onClickfilter = category => {
    cateListHandle(category, articleAllData, setCateInLists, navigate, filterText);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles</div>;

  return (
    <div className="py-[40px]">
      <h2 className="pl-[12vw] py-[20px] text-xl">오늘의 추천</h2>
      <div className="pl-[12vw] overflow-hidden">
        <Swiper slidesPerView={'auto'} spaceBetween={20} className="mySwiper w-[100%] h-[800px]">
          {mainBannerCate.map((cate, index) => {
            return (
              <SwiperSlide
                key={index}
                className="text-center text-[18px] bg-slate-50 w-[80%] flex justify-center items-center"
                onClick={() => onClickfilter(cate)}
              >
                {cate}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MainBanner;
