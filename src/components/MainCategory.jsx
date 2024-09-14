import React from 'react';

// 추후 map으로 돌리기
const MainCategory = () => {
  return (
    <div className="p-[20px] flex flex-col gap-[20px] max-w-[1500px] mx-auto">
      <h2>카테고리</h2>
      <ul className="flex gap-[10px] w-[100%] h-[300px]">
        <li className="w-[20%]">
          <span className="flex w-[200px] h-[200px] rounded-[50%] bg-slate-400 items-center justify-center">
            모각코
          </span>
        </li>
        <li className="w-[20%]">
          <span className="flex w-[200px] h-[200px] rounded-[50%] bg-slate-400 items-center justify-center">
            모각코
          </span>
        </li>
        <li className="w-[20%]">
          <span className="flex w-[200px] h-[200px] rounded-[50%] bg-slate-400 items-center justify-center">
            모각코
          </span>
        </li>
        <li className="w-[20%]">
          <span className="flex w-[200px] h-[200px] rounded-[50%] bg-slate-400 items-center justify-center">
            모각코
          </span>
        </li>
        <li className="w-[20%]">
          <span className="flex w-[200px] h-[200px] rounded-[50%] bg-slate-400 items-center justify-center">
            모각코
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MainCategory;
