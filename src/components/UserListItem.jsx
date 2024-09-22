import React, { useState } from 'react';
import { useDetailItemClick } from '../utils/goDetail';
import { getCategoryColor } from '../utils/getCategoryColor';
import { DATA_API } from '../api/api';

const UserListItem = ({ data }) => {
  const [WriterNickname, setWriterNickname] = useState('작성자');
  const { detailItemClick } = useDetailItemClick();

  // 작성자 ID 이용하여 닉네임 불러오기
  const userData = data?.author_id;
  const getWriterNickname = async () => {
    const { data: userNickname, isError } = await DATA_API.get(`/users/${userData}`);
    if (isError) return;
    setWriterNickname(userNickname.user_nickname);
  };
  getWriterNickname();

  return (
    <div
      className="flex items-start justify-between  gap-[10px] w-full h-full cursor-pointe border-black border-t-[1px] pt-[20px]"
      onClick={() => detailItemClick(data.id)}
    >
      <div className="flex flex-col gap-[20px]">
        <h2 className="font-bold text-[20px]">{data.title}</h2>
        <span className="text-[14px]" style={{ color: getCategoryColor(data.category) }}>
          # {data.category}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span>{WriterNickname}</span>
        <span>|</span>
        <span>{data.date}</span>
      </div>
    </div>
  );
};

export default UserListItem;
