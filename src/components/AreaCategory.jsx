import React from 'react';

const areaCategory = ['서울', '경기도', '충청도', '전라도', '경상도', '강원도', '제주도'];

const AreaCategory = () => {
  return (
    <div className="p-[20px] flex flex-col gap-[20px] max-w-[1500px] w-full mx-auto">
      <h2>지역 카테고리</h2>
      <ul className="w-full h-[300px] grid grid-cols-4 grid-rows-2 gap-[20px]">
        {areaCategory.map((area, idex) => {
          return (
            <li key={idex} className="flex items-center justify-center bg-slate-400">
              {area}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AreaCategory;
