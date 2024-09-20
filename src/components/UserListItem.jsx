import React from 'react';
import { useDetailItemClick } from '../utils/goDetail';
import { Bookmark } from 'lucide-react';

const UserListItem = ({ data }) => {
  const { detailItemClick } = useDetailItemClick();
  return (
    <div
      className="flex justify-between  gap-[10px] w-full h-full cursor-pointe border-black border-t-[1px] pt-[20px]"
      onClick={() => detailItemClick(data.id)}
    >
      <div>
        <h2 className="font-semibold">{data.title}</h2>
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
