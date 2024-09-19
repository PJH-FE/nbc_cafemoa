import { useState } from 'react';
import MainBanner from '../components/MainBanner';
import MainRecommend from '../components/MainRecommend';
import MainCategory from '../components/MainCategory';
import AreaCategory from '../components/AreaCategory';
import WritingFixBtn from '../components/WritingFixBtn';

const Home = () => {
  return (
    <div className="flex flex-col gap-[100px] relative">
      <MainBanner />
      <MainCategory />
      <div className="flex flex-col item-center gap-[80px]">
        <MainRecommend />
        {/* <MainRecommend /> */}
      </div>
      <AreaCategory />
      <WritingFixBtn />
    </div>
  );
};
export default Home;
