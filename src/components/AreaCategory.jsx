import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/cateListHandle';
import { DATA_API } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import useUserStore from '../zustand/bearStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

const areaCategory = [
  {
    title: '서울',
    img: 'https://cdn.pixabay.com/photo/2022/09/20/11/21/sunset-7467688_960_720.jpg',
  },
  {
    title: '경기',
    img: 'https://cdn.pixabay.com/photo/2018/11/09/11/04/mars-3804300_960_720.jpg',
  },
  {
    title: '인천',
    img: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRN44zV4szmKLI0H3sWokq_4G4vaO4BQepYWXgkxVtT1G0ecZ59JmpX6aAFxSa0rOdJIdZzEIim7BS1Q3L0FlPu07ajKtBR8cqIz7-hIA',
  },
  {
    title: '충북',
    img: 'https://lh5.googleusercontent.com/p/AF1QipPlSpjor6CjwAl8GKBnRWgIf8Qhj9lJLsRjFtog=w540-h312-n-k-no',
  },
  {
    title: '충남',
    img: 'https://lh5.googleusercontent.com/p/AF1QipNb70RqjUGxT76lFEgkNbjjWY8Gnj3ZNgZNS0YO=w540-h312-n-k-no',
  },
  {
    title: '전북',
    img: 'https://cdn.pixabay.com/photo/2023/02/27/13/57/traditional-village-7818476_960_720.jpg',
  },
  {
    title: '전남',
    img: 'https://lh5.googleusercontent.com/p/AF1QipMb1_uitNqUNjqvjzDabHfKjM6kxTZLcRiOJN_t=w540-h312-n-k-no',
  },
  {
    title: '경북',
    img: 'https://lh5.googleusercontent.com/p/AF1QipPhlrfKh9x8XPDhj5hwN-voMRpGnpEzeh8ZmWts=w540-h312-n-k-no',
  },
  {
    title: '경남',
    img: 'https://lh5.googleusercontent.com/p/AF1QipNMKKvlf7C9qs-3MUouTKAt9vRKFbPJW1fhn-4b=w540-h312-n-k-no',
  },
  {
    title: '부산',
    img: 'https://lh6.googleusercontent.com/proxy/sv_JUB6su4Z3_C8-69epF_nmVUJblf5PTJxJB1Du4JBkTVfT2mBSw5xJTIJSQosr8YHwxojMkGgO-uBG4-PxGt9X7TFCXcHKIf7BfMp7riShGNLf9vBuYfrgw2TniSXCCy4s4gFxeB2txX4UA0InYY2iWmm-Qwk=w540-h312-n-k-no',
  },
  {
    title: '강원',
    img: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQi81Vc5czBFBM8EpkWxHhmsKVkLqz-uIQeKWph1aOdkaJkKgql188-sv9t0EfEx15SOXzsE-Ib-R85JbmauuBZZd5fUK4kNpNmhDGuTA',
  },
  {
    title: '제주',
    img: 'https://cdn.pixabay.com/photo/2020/05/05/07/52/republic-of-korea-5131925_960_720.jpg',
  },
];

const AreaCategory = () => {
  const { closeMenu } = useUserStore();
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const setCateInLists = []; //필터링된 리스트 저장
  const filterText = 'region'; //필터링된 리스트 저장
  const navigate = useNavigate();

  //article 데이터 전체 가져오기
  const {
    data: cafedbData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cafedb'],
    queryFn: async () => {
      const { data } = await DATA_API.get('/cafedb');
      return data;
    },
  });

  useEffect(() => {
    if (cafedbData) {
      setArticleAllData(cafedbData);
    }
  }, [cafedbData]);

  //util : 필터링 함수호출
  const onClickfilter = area => {
    cateListHandle(area, articleAllData, setCateInLists, navigate, filterText);
    closeMenu();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles</div>;

  return (
    <div className="pl-[20px] py-[50px] flex flex-col gap-[40px] max-w-[1500px] mx-auto overflow-hidden w-full">
      <div>
        <h2 className="pb-[40px]">지역 카테고리</h2>
        <Swiper
          className="mySwiper gap-4 overflow-x-scroll block sm:pr-[20px]"
          direction={'horizontal'}
          freeMode={true}
          scrollbar={{ draggable: true }}
          mousewheel={true}
          spaceBetween={20}
          slidesPerView={'auto'}
          modules={[FreeMode, Scrollbar, Mousewheel]}
        >
          {areaCategory.map((area, idex) => {
            return (
              <SwiperSlide
                key={idex}
                className="p-[20px] w-[120px] bg-[#F4EFEB] rounded-full bg-cover bg-center"
                onClick={() => onClickfilter(area.title)}
                style={{ backgroundImage: `url(${area.img})` }}
                aria-label={area.title}
              >
                <div className="relative w-full h-full">
                  <p className=" w-[80px] h-[80px] flex items-center justify-center text-[#fff] text-[20px] opacity-1 ">
                    {area.title}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default AreaCategory;
