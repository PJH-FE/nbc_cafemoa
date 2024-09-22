import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function DescrtiptionEditor({
  changeDescription,
  description: currentDescription,
  isMyProfile,
}) {
  const [updatedDescription, setUpdatedDescription] = useState(() => currentDescription);

  const handleDescriptionChange = e => {
    setUpdatedDescription(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    changeDescription(updatedDescription);
    toast.success('변경이 완료되었습니다');
  };

  useEffect(() => {
    setUpdatedDescription(currentDescription);
  }, [currentDescription]);

  return (
    <>
      {isMyProfile ? (
        <form className="relative mt-3 sm:mt-[30px] sm:w-full" onSubmit={handleSubmit}>
          <textarea
            className="border-[2px] rounded-[4px] p-[15px] w-full min-h-20 focus:outline-none focus:ring-1 focus:ring-[#3B3030] text-sm border-primary01"
            onChange={handleDescriptionChange}
            value={updatedDescription}
            rows={2}
            placeholder="한 줄 소개 적어보기"
          />
          <button
            className="absolute bottom-[15px] right-[7px] text-white rounded-md px-3 py-1 bg-[#3B3030] hover:bg-[#2a2a2a] transition text-xs"
            type="submit"
          >
            수정
          </button>
        </form>
      ) : (
        <div
          className="mt-3 border rounded-md p-2 w-full min-h-20 focus:outline-none focus:ring-1 focus:ring-[#3B3030] text-sm border-primary01"
          onChange={handleDescriptionChange}
        >
          {updatedDescription}
        </div>
      )}
    </>
  );
}
