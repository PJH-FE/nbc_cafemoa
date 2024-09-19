import { useState } from 'react';

export default function NicknameEditor({ changeNickname, userNickname }) {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    changeNickname(nickname);
    alert('변경이 완료되었습니다');
    setNickname('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <div>
          <label>닉네임</label>
          <input onChange={handleNicknameChange} value={nickname} placeholder={userNickname || ''} />
        </div>
        <button type="submit" className="border-green-900 border">
          수정
        </button>
      </form>
    </div>
  );
}
