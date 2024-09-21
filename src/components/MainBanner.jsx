import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/cateListHandle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DATA_API } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import useUserStore from '../zustand/bearStore';

const mainBannerCate = [
  {
    title: '디저트',
    content: (
      <>
        디저트 한 입,
        <br />
        여유로운 순간 두 배
      </>
    ),
    img: 'https://img.siksinhot.com/article/1683508975935196.jpeg',
  },
  {
    title: '뷰맛집',
    content: (
      <>
        풍경과 커피가 만나는 곳<br />
        완벽한 힐링을 경험하세요
      </>
    ),
    img: 'https://mblogthumb-phinf.pstatic.net/MjAyMzAzMDNfMjMx/MDAxNjc3ODQzNDM1Njc1.z3uKTaV1d3gAko99ixA6mIykuJensQITwUkJvapyjk8g.PlBdAifU_FMQWp2qkUDv0tRTJKGN0523yI-sAMnmIWQg.PNG.starvlhy/image.png?type=w800',
  },
  {
    title: '모각코',
    content: (
      <>
        함께 모여 각자 코딩,
        <br />
        함께하는 모각코 타임
      </>
    ),
    img: 'https://mblogthumb-phinf.pstatic.net/MjAyMTA5MTRfODMg/MDAxNjMxNjI5NzU1OTY2.iaV5yr8W_qdgP3O--UULQCKTP-yq5Y3OS3G_gehrZ5Eg.B4OctodwjN89J2QSX6to5PivPeZLDW3FaL8UUL5FsR4g.JPEG.fragrance94/682C3442-87C1-49FC-B2DF-F7A18C688181.jpg?type=w800',
  },
];

const MainBanner = () => {
  const { closeMenu } = useUserStore();
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const setCateInLists = []; //필터링된 리스트 저장
  const filterText = 'category'; //필터링된 리스트 저장
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
  const onClickfilter = category => {
    cateListHandle(category, articleAllData, setCateInLists, navigate, filterText);
    closeMenu();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles</div>;

  return (
    <div className="py-[40px] bg-[#F4EFEB]">
      <h2 className="lg:pl-[12vw] sm:pl-[20px] py-[40px] sm:py-[20px] text-xl">오늘의 추천</h2>
      <div className="lg:pl-[12vw] sm:pl-[20px] overflow-hidden">
        <Swiper slidesPerView={'auto'} spaceBetween={20} className="mySwiper w-[100%] h-[800px] sm:h-[500px]">
          {mainBannerCate.map((cate, index) => {
            return (
              <SwiperSlide
                key={index}
                className="text-center text-[18px] bg-slate-50 lg:w-[80%] sm:w-[90%] flex justify-start items-end"
                onClick={() => onClickfilter(cate.title)}
                style={{
                  backgroundImage: `url(${cate.img})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h1 className="absolute text-[42px] sm:text-[24px] text-[#fff] text-left mb-[40px] ml-[40px] leading-[1.5] sm:mb-[20px] sm:ml-[20px]">
                  {cate.content}
                </h1>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MainBanner;
