import { useRef, useState } from 'react';
import { supabase } from '../supabase/supabase';

export default function ProfileImageUploader({ profileURL, changeProfileImage }) {
  const [image, setImage] = useState(profileURL);
  const fileInputRef = useRef(null);

  const handleFileInputChange = async e => {
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

  return (
    <>
      <input type="file" className="hidden" onChange={handleFileInputChange} ref={fileInputRef} />
      <div
        className="w-36 h-36 rounded-full border-2 border-gray-800 overflow-hidden flex items-center justify-center bg-gray-900 relative cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        {image && (
          <img src={image} alt="Uploaded" className="w-full h-full object-cover opacity-35 object-center" />
        )}
        <div className="absolute text-white text-sm">이미지 변경</div>
      </div>
    </>
  );
}
