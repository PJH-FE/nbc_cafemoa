import React from 'react';

// console.log('articleMockData', articleMockData[0].category);
const SpotListItem = ({ data }) => {
  return (
    <div className="w-[25%] h-[500px] bg-slate-50 ">
      <div>{data.title}</div>
      <div>{data.region}</div>
      <div>{data.date}</div>
    </div>
  );
};

export default SpotListItem;
