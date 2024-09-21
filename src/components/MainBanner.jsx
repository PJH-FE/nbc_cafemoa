import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/cateListHandle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DATA_API } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import useUserStore from '../zustand/bearStore';

const mainBannerCate = [
  // '뷰맛집', '24시', '디저트맛집'
  {
    title: '뷰맛집',
    img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240110_241%2F17048555638842aqBy_JPEG%2FKakaoTalk_20240110_113102383_18.jpg',
  },
  {
    title: '디저트',
    img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240220_10%2F1708419989935Jq6h6_JPEG%2FIMG_4165.jpeg',
  },
  {
    title: '모각코',
    img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210224_260%2F1614171847308CURkC_JPEG%2Fqt7Zf1J99crdR_VGE-RZ7n6i.jpeg.jpg',
  },
];

const MainBanner = () => {
  const { isMenuOpen, toggleMenu } = useUserStore();
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
    toggleMenu();
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
                className="text-center text-[18px] bg-slate-50 lg:w-[80%] sm:w-[90%] flex justify-center items-center"
                onClick={() => onClickfilter(cate.title)}
                style={{
                  backgroundImage: `url(${cate.img})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              >
                {/* {cate.title} */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MainBanner;
