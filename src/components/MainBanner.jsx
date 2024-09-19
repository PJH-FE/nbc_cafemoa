import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const mainBannerCate = ['뷰맛집', '서울', '24시', '디저트맛집'];

const MainBanner = () => {
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const [cateInLists, setCateInLists] = useState([]); //필터링된 리스트 상태저장
  const [filterText, setFilterText] = useState(() => {
    const initialFilter = Math.random() > 0.5 ? 'region' : 'category';
    return initialFilter;
  }); //필터링된 리스트 상태저장
  const navigate = useNavigate();

  //article 데이터 전체 가져오기
  useEffect(() => {
    const getArticle = async () => {
      const { data: articleData } = await axios.get('http://localhost:5000/article');
      setArticleAllData(articleData);
    };
    getArticle();
  }, []);

  //util : 필터링 함수호출
  const onClickfilter = cate => {
    cateListHandle(cate, articleAllData, setCateInLists, navigate, filterText);
  };

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
