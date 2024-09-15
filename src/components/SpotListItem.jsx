import React from 'react';

const SpotListItem = ({ data }) => {
  return (
    <div className="w-full h-[500px] bg-slate-50 ">
      <div>{data.title}</div>
      <div>{data.region}</div>
      <div>{data.date}</div>
      <div>{data.region}</div>
      <div>{data.category}</div>
    </div>
  );
};

export default SpotListItem;
