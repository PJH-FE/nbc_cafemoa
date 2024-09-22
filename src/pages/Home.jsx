import MainBanner from '../components/MainBanner';
import MainRecommend from '../components/MainRecommend';
import MainCategory from '../components/MainCategory';
import AreaCategory from '../components/AreaCategory';

const Home = () => {
  return (
    <div className="relative flex flex-col mb-[-120px] sm:mb-[-80px]">
      <div className="bg-[#F4EFEB]">
        <MainBanner />
        <MainCategory />
      </div>
      <div className="flex flex-col item-center gap-[80px]">
        <MainRecommend />
      </div>
      <span className="bg-[#F4EFEB] w-full h-[10px]"></span>
      <AreaCategory />
    </div>
  );
};
export default Home;
