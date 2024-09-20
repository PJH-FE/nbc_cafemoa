import React from 'react';
import { useDetailItemClick } from '../utils/goDetail';
import { Bookmark } from 'lucide-react';

const UserListItem = ({ data }) => {
  const { detailItemClick } = useDetailItemClick();
  return (
    <div
      className="flex flex-col gap-[10px] w-full h-full cursor-pointe "
      onClick={() => detailItemClick(data.id)}
    >
      <div className="relative w-full h-full max-h-[400px]">
        <img className="object-cover w-full h-full" src={data.thumbnail} alt={data.title} />
        <span className="absolute top-[10px] right-[10px]">
          <Bookmark />
        </span>
      </div>
      <div className="flex items-center justify-between border-black border-t-[1px] pt-[20px]">
        <h2 className="font-semibold">{data.title}</h2>
        <p className="font-normal text-slate-500 text-[13px]">{data.region}</p>
      </div>
      <span># {data.category}</span>
    </div>
  );
};

export default UserListItem;
