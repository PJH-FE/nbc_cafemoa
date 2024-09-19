import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/utils';
import axios from 'axios';

const areaCategory = ['서울', '경기도', '충청도', '전라도', '경상도', '강원도', '제주도'];

const AreaCategory = () => {
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const [cateInLists, setCateInLists] = useState([]); //필터링된 리스트 상태저장
  const [filterText, setFilterText] = useState('region'); //필터링된 리스트 상태저장
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
  const onClickfilter = area => {
    cateListHandle(area, articleAllData, setCateInLists, navigate, filterText);
  };

  return (
    <div className="p-[20px] flex flex-col gap-[20px] max-w-[1500px] w-full mx-auto">
      <h2>지역 카테고리</h2>
      <ul className="w-full h-[300px] grid lg:grid-cols-4 lg:grid-rows-2 gap-[20px] sm:grid-cols-3 sm:grid-rows-3">
        {areaCategory.map((area, idex) => {
          return (
            <li
              key={idex}
              className="flex items-center justify-center bg-slate-400"
              onClick={() => onClickfilter(area)}
            >
              {area}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AreaCategory;
