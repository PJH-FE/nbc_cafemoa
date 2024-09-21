import React from 'react';
import { useDetailItemClick } from '../utils/goDetail';

const UserListItem = ({ data }) => {
  const { detailItemClick } = useDetailItemClick();
  return (
    <div
      className="flex justify-between  gap-[10px] w-full h-full cursor-pointe border-black border-t-[1px] pt-[20px]"
      onClick={() => detailItemClick(data.id)}
    >
      <div className="flex flex-col gap-[20px]">
        <h2 className="font-bold text-[20px]">{data.title}</h2>
        <span># {data.category}</span>
      </div>

      <div>
        <span>{data.author_id}</span>
        <span>|</span>
        <span>{data.date}</span>
      </div>
    </div>
  );
};

export default UserListItem;
