import { useState } from 'react';
import MainBanner from '../components/MainBanner';
import MainRecommend from '../components/MainRecommend';
import MainCategory from '../components/MainCategory';
import AreaCategory from '../components/AreaCategory';
import WritingFixBtn from '../components/WritingFixBtn';

const Home = () => {
  return (
    <div className="relative flex flex-col">
      <div className="bg-[#F4EFEB]">
        <MainBanner />
        <MainCategory />
      </div>
      <div className="flex flex-col item-center gap-[80px]">
        <MainRecommend />
        {/* <MainRecommend /> */}
      </div>
      <span className="bg-[#F4EFEB] w-full h-[10px]"></span>
      <AreaCategory />
      <WritingFixBtn />
    </div>
  );
};
export default Home;
