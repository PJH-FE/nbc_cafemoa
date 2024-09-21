import { useState } from 'react';

export default function DescrtiptionEditor({ changeDescription, description: currentDescription }) {
  const [updatedDescription, setUpdatedDescription] = useState(currentDescription);

  const handleDescriptionChange = e => {
    setUpdatedDescription(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    changeDescription(updatedDescription);
    alert('변경이 완료되었습니다');
  };

  return (
    <form className="relative mt-2" onSubmit={handleSubmit}>
      <textarea
        className="border rounded-md p-1 w-full min-h-20 focus:outline-none focus:ring-1 focus:ring-[#3B3030] text-sm border-customHardBorder"
        onChange={handleDescriptionChange}
        value={updatedDescription}
        rows={2}
      />
      <button
        className="absolute bottom-2.5 right-1 text-white rounded-md px-3 py-1 bg-[#3B3030] hover:bg-[#2a2a2a] transition text-xs"
        type="submit"
      >
        수정
      </button>
    </form>
  );
}
