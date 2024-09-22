import { useState } from 'react';
import { toast } from 'react-toastify';

export default function NicknameEditor({
  changeNickname: onNicknameChange,
  userNickname: currentNickname,
  isMyProfile,
}) {
  const [nickname, setNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handleSubmit = e => {
    const cleanedNickname = nickname.trim();
    if (cleanedNickname === '') {
      toast.error('변경할 닉네임을 입력해주세요');
      return;
    }

    onNicknameChange(cleanedNickname);
    toast.success('변경이 완료되었습니다');
    setIsEditing(false);
    setNickname('');
  };

  return (
    <>
      <div className="flex flex-col">
        {isEditing ? (
          <div>
            <input
              onChange={handleNicknameChange}
              value={nickname}
              placeholder={currentNickname}
              className="border rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-[#3B3030] border-primary01 text-sm mr-2"
            />
            <button
              className="text-white rounded-md px-3 py-1 bg-[#3B3030] hover:bg-[#2a2a2a] transition text-xs"
              onClick={handleSubmit}
            >
              수정
            </button>
          </div>
        ) : (
          <div>
            <span className="text-xl font-bold mr-1">{currentNickname}</span>
            <span>님</span>
            <button
              className={`ml-2 mt-2 text-white rounded-md px-3 py-1 bg-[#3B3030] hover:bg-[#2a2a2a] transition text-xs ${
                !isMyProfile && 'hidden'
              }`}
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
          </div>
        )}
      </div>
    </>
  );
}
