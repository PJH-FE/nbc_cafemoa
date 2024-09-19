import React from 'react';
import { useDetailItemClick } from '../utils/goDetail';

const SpotListItem = ({ data }) => {
  const detailItemClick = useDetailItemClick();

  return (
    <div className="w-full h-[500px] bg-slate-50 cursor-pointer " onClick={() => detailItemClick(data.id)}>
      <div>{data.title}</div>
      <div>{data.region}</div>
      <div>{data.date}</div>
      <div>{data.category}</div>
    </div>
  );
};

export default SpotListItem;
