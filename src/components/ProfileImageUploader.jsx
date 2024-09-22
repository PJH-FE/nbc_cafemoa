import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { CircleUserRound } from 'lucide-react';

export default function ProfileImageUploader({ profileURL, changeProfileImage, isMyProfile }) {
  const [image, setImage] = useState(() => profileURL);
  const fileInputRef = useRef(null);

  const handleFileInputChange = async e => {
    if (!isMyProfile) return;
    const [file] = e.target.files;
    if (!file) return;

    try {
      const { data, error } = await supabase.storage.from('avatars').upload(`avatar_${Date.now()}.png`, file);
      if (error) throw error;

      const newImage = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${data.path}`;
      setImage(newImage);
      changeProfileImage(newImage);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setImage(profileURL);
  }, [profileURL]);

  return (
    <>
      <input
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        disabled={!isMyProfile}
      />
      <div
        className={`relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border-2 border-gray-800 overflow-hidden flex items-center justify-centerrelative ${
          isMyProfile && 'cursor-pointer'
        }`}
        onClick={() => fileInputRef.current.click()}
      >
        {image ? (
          <img src={image} alt="Uploaded" className={`w-full h-full object-cover object-center`} />
        ) : (
          <CircleUserRound size={180} strokeWidth={1} />
        )}
        {isMyProfile && (
          <div className="opacity-0 hover:opacity-100 duration-300 absolute flex w-full h-full items-center justify-center bg-[rgba(0,0,0,0.4)] text-sm text-white">
            이미지 변경
          </div>
        )}
      </div>
    </>
  );
}
