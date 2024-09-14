import { useState } from 'react';
import MainBanner from '../components/MainBanner';
import MainRecommend from '../components/MainRecommend';
import MainCategory from '../components/MainCategory';
import AreaCategory from '../components/AreaCategory';

const Home = () => {
  return (
    <div className="flex flex-col gap-[100px]">
      <MainBanner />
      <MainCategory />
      <div className="flex flex-col item-center gap-[80px]">
        <MainRecommend />
        {/* <MainRecommend /> */}
      </div>
      <AreaCategory />
    </div>
  );
};
export default Home;
