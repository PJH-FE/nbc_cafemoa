import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/cateListHandle';
import axios from 'axios';
import { DATA_API } from '../api/api';
import { useQuery } from '@tanstack/react-query';

const areaCategory = [
  '서울',
  '경기',
  '경남',
  '경북',
  '충남',
  '충복',
  '전북',
  '전남',
  '부산',
  '제주',
  '강원',
  '인천',
];

const AreaCategory = () => {
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const setCateInLists = []; //필터링된 리스트 저장
  const filterText = 'region'; //필터링된 리스트 저장
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
  const onClickfilter = area => {
    cateListHandle(area, articleAllData, setCateInLists, navigate, filterText);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading articles</div>;

  return (
    <div className="p-[20px] flex flex-col gap-[20px] max-w-[1500px] w-full mx-auto">
      <h2>지역 카테고리</h2>
      <ul className="w-full h-[300px] grid lg:grid-cols-6 lg:grid-rows-2 gap-[20px] sm:grid-cols-3 sm:grid-rows-4">
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
