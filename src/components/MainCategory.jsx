import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/utils';
import { DATA_API } from '../api/api';

const category = [
  '모각코',
  '뷰맛집',
  '24시',
  '디저트맛집',
  '애견동반',
  '한옥',
  '분좋카',
  // {
  //   title: '모각코',
  //   icon: '💻',
  // },
  // {
  //   title: '뷰맛집',
  //   icon: '🌉',
  // },
  // {
  //   title: '24시',
  //   icon: '🕑',
  // },
  // {
  //   title: '디저트맛집',
  //   icon: '🍰',
  // },
  // {
  //   title: '애견동반',
  //   icon: '🐶🐱',
  // },
  // {
  //   title: '한옥',
  //   icon: '🏠',
  // },
  // {
  //   title: '분좋카',
  //   icon: '💕',
  // },
];

const MainCategory = () => {
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const [cateInLists, setCateInLists] = useState([]); //필터링된 리스트 상태저장
  const [filterText, setFilterText] = useState('category'); //필터링된 리스트 상태저장
  const navigate = useNavigate();

  //article 데이터 전체 가져오기
  useEffect(() => {
    const getArticle = async () => {
      const { data: articleData } = await DATA_API.get('/articles');
      setArticleAllData(articleData);
    };
    getArticle();
  }, []);

  //util : 필터링 함수호출
  const onClickfilter = cate => {
    cateListHandle(cate, articleAllData, setCateInLists, navigate, filterText);
  };

  return (
    <div className="p-[20px] flex flex-col gap-[20px] max-w-[1500px] w-full mx-auto">
      <h2>카테고리</h2>
      <ul className="flex gap-[10px] w-[100%] h-[300px] sm:grid sm:grid-cols-3 sm:grid-rows-3">
        {category.map((cate, index) => {
          return (
            <li key={index} className="flex-1 cursor-pointer" onClick={() => onClickfilter(cate)}>
              <span className="flex flex-col gap-2 h-full max-h-[200px] rounded-[8px] bg-slate-400 items-center justify-center text-[30px]">
                {cate}
                {/* <p className="text-[20px]">{cate.title}</p> */}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainCategory;
