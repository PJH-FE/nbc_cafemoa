import React from 'react';
import { useDetailItemClick } from '../utils/goDetail';

const SpotListItem = ({ data }) => {
  const detailItemClick = useDetailItemClick();
  console.log('data', data);
  return (
    <div
      className="flex-col w-full h-full max-h-[90%] cursor-pointer bg-slate-50 "
      onClick={() => detailItemClick(data.id)}
    >
      <div className="relative w-full h-full">
        <img className="object-cover w-full h-full" src={data.thumbnail} alt={data.title} />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{data.title}</h2>
        <p className="font-normal text-slate-500">{data.region}</p>
      </div>
      <span>{data.category}</span>
    </div>
  );
};

export default SpotListItem;
