import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/cateListHandle';
import { DATA_API } from '../api/api';
import { useQuery } from '@tanstack/react-query';

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
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const setCateInLists = []; //필터링된 리스트 저장
  const filterText = 'category'; //필터링된 리스트 저장
  const navigate = useNavigate();

  //article 데이터 전체 가져오기
  const {
    data: articleData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data } = await DATA_API.get('/articles');
      return data;
    },
  });

  useEffect(() => {
    if (articleData) {
      setArticleAllData(articleData);
    }
  }, [articleData]);

  //util : 필터링 함수호출
  const onClickfilter = category => {
    cateListHandle(category, articleAllData, setCateInLists, navigate, filterText);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles</div>;
  // console.log('category', category);
  return (
    <div className="px-[20px] py-[50px] flex flex-col gap-[20px] max-w-[1500px] w-full mx-auto">
      {/* <h2>이런 카페 어때요</h2> */}
      <ul className="flex gap-[20px] w-[100%] h-[300px] sm:grid sm:grid-cols-4 ">
        {category.map((cate, index) => {
          return (
            <li key={index} className="flex-1 cursor-pointer" onClick={() => onClickfilter(cate.title)}>
              <span className="flex flex-col gap-2 h-full max-h-[200px] rounded-[30px] bg-[#fff] items-center justify-center text-[20px]">
                <span className="text-[40px]">{cate.icon}</span>
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
