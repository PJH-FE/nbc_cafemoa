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
      <div className="max-w-sm mx-auto p-2 border border-white rounded-lg shadow-md">
        <input type="file" className="hidden" onChange={handleFileInputChange} ref={fileInputRef} />
        <div className="w-full h-64 flex items-center justify-center mb-4">
          <div className="w-36 h-36 rounded-full border-4 border-gray-800 overflow-hidden flex items-center justify-center bg-gray-900">
            {image && <img src={image} alt="Uploaded" className="w-full h-full object-cover" />}
          </div>
        </div>
        <button
          className="w-full py-2 text-white rounded-lg mb-2 bg-gray-800 hover:bg-gray-700"
          onClick={() => fileInputRef.current.click()}
        >
          프로필 이미지 변경
        </button>
      </div>
    </>
  );
}
