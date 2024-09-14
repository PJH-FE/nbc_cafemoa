import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

export default function App() {
  return (
    <div className="py-[40px]">
      <h2 className="pl-[12vw] py-[20px] text-xl">오늘의 추천</h2>
      <div className="pl-[12vw] overflow-hidden">
        <Swiper slidesPerView={'auto'} spaceBetween={20} className="mySwiper w-[100%] h-[800px]">
          <SwiperSlide className="text-center text-[18px] bg-slate-50 w-[80%] flex justify-center items-center">
            Slide 1
          </SwiperSlide>
          <SwiperSlide className="text-center text-[18px] bg-slate-50 w-[80%] flex justify-center items-center">
            Slide 2
          </SwiperSlide>
          <SwiperSlide className="text-center text-[18px] bg-slate-50 w-[80%] flex justify-center items-center">
            Slide 3
          </SwiperSlide>
          <SwiperSlide className="text-center text-[18px] bg-slate-50 w-[80%] flex justify-center items-center">
            Slide 4
          </SwiperSlide>
          <SwiperSlide className="text-center text-[18px] bg-slate-50 w-[80%] flex justify-center items-center">
            Slide 5
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
