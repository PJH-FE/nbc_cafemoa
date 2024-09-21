import { useState } from 'react';

export default function NicknameEditor({ changeNickname, userNickname }) {
  const [nickname, setNickname] = useState('');
  const [isUpdateNickname, setIsUpdateNickName] = useState(false);

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handleClick = e => {
    changeNickname(nickname);
    alert('변경이 완료되었습니다');
    setIsUpdateNickName(prev => !prev);
    setNickname('');
  };

  return (
    <>
      <div className="flex flex-col">
        {isUpdateNickname ? (
          <div>
            <input
              onChange={handleNicknameChange}
              value={nickname}
              placeholder={userNickname}
              className="focus:outline-[#3B3030] p-1 mr-2"
            />
            <button
              className="text-white border bg-customHardBorder rounded-md px-3 py-1 mt-2 hover:bg-[#3B3030] transition"
              onClick={handleClick}
            >
              수정
            </button>
          </div>
        ) : (
          <div>
            <span className="text-xl font-bold mr-1">{userNickname}</span>
            <span>님</span>
            <button
              className="ml-2 mt-2 bg-customHardBorder text-white bg-custom rounded-md px-3 py-1 hover:bg-[#3B3030] transition"
              onClick={() => setIsUpdateNickName(prev => !prev)}
            >
              수정
            </button>
          </div>
        )}
      </div>
    </>
  );
}
