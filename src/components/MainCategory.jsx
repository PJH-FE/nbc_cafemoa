import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/cateListHandle';
import { DATA_API } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import useUserStore from '../zustand/bearStore';

const category = [
  {
    title: '모각코',
    icon: '💻',
  },
  {
    title: '뷰맛집',
    icon: '🌉',
  },
  {
    title: '24시',
    icon: '🕑',
  },
  {
    title: '디저트',
    icon: '🍰',
  },
  {
    title: '애견동반',
    icon: '🐶🐱',
  },
  {
    title: '한옥',
    icon: '🏠',
  },
  {
    title: '분좋카',
    icon: '💕',
  },
];

const MainCategory = () => {
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
    <div className="px-6 py-[50px] flex flex-col gap-[20px] max-w-[1500px] w-full mx-auto">
      {/* <h2>이런 카페 어때요</h2> */}
      <ul className="flex gap-6 sm:gap-[10px] w-[100%]  sm:grid sm:grid-cols-4 ">
        {category.map((cate, index) => {
          return (
            <li key={index} className="flex-1 cursor-pointer" onClick={() => onClickfilter(cate.title)}>
              <span className="flex flex-col gap-2 sm:h-[auto] sm:py-6 py-8 max-h-[200px] rounded-[30px] bg-[#fff] items-center justify-center text-[20px]">
                <span className="sm:text-3xl text-[40px]">{cate.icon}</span>
                <p className="text-[17px] text-[#61443A]">{cate.title}</p>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainCategory;
