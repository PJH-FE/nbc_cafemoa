import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { supabase } from '../../supabase/supabase';
import Map from './Map';
import { useCallback, useState } from 'react';
import _ from 'lodash';

const toolbar = [['heading', 'bold', 'italic', 'strike'], ['hr', 'quote', 'ul', 'ol'], ['image']];

function TuiEditor({ content, editorRef }) {
  // supabase로 업로드 이미지 관리
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const handleImage = async (file, callback) => {
    const { data, error } = await supabase.storage.from('posts').upload(`userid/${Date.now()}`, file);
    if (error) {
      console.error('Image upload failed:', error.message);
      return;
    }
    callback(`${supabaseUrl}/storage/v1/object/public/${data.fullPath}`);
  };

  const [cafe, setCafe] = useState({ cafeName: '', address: '' });
  const [cafeData, setCafeData] = useState({});
  const changeCafeInfo = e => {
    const { id, value } = e.target;
    setCafe({ ...cafe, [id]: value });
    handleCafeData({ ...cafe, [id]: value });
  };

  const handleCafeData = useCallback(
    _.debounce(info => setCafeData(info), 500),
    [],
  );

  return (
    <>
      <form>
        <label htmlFor="title">제목</label>
        <input type="text" name="title" id="title" />
        <Editor
          initialValue={content ?? ' '}
          initialEditType="wysiwyg"
          autofocus={false}
          ref={editorRef}
          toolbarItems={toolbar}
          hideModeSwitch
          height="500px"
          hooks={{ addImageBlobHook: handleImage }}
        />

        <div className="cafeArea">
          <label htmlFor="cafeName">카페 이름</label>
          <input
            type="text"
            name="cafeName"
            id="cafeName"
            value={cafe.cafeName || ''}
            onChange={e => changeCafeInfo(e)}
          />

          <label htmlFor="address">카페 주소</label>
          <input
            type="text"
            name="address"
            id="address"
            value={cafe.address || ''}
            onChange={e => changeCafeInfo(e)}
          />
          <Map cafeData={cafeData} />
        </div>
      </form>
    </>
  );
}

export default TuiEditor;
