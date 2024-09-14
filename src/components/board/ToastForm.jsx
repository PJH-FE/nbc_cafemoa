import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { supabase, supabaseUrl } from '../../supabase/supabase';
import Map from './Map';
import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { DATA_API } from '../../api/api';
import getNowDate from '../../utils/getNowDate';
import { useNavigate } from 'react-router-dom';

const toolbar = [['heading', 'bold', 'italic', 'strike'], ['hr', 'quote', 'ul', 'ol'], ['image']];

function TuiEditor({ content }) {
  const [postId, setPostId] = useState(crypto.randomUUID());

  const [post, setPost] = useState({
    category: '24시',
    title: '',
    content: '',
    author_id: '',
    date: '',
    cafe_address: '',
    region: '',
  });
  const [cafe, setCafe] = useState({ cafeName: '', cafeAddress: '' });
  const [cafeData, setCafeData] = useState({});
  const navigate = useNavigate();
  // 카테고리, 타이틀 관리
  const changeValue = e => {
    const { id, value } = e.target;
    setPost({ ...post, [id]: value });
  };

  // 토스트 에디터 관리
  const handleEditorChange = () => {
    const contentData = editorRef.current.getInstance().getHTML();
    setPost({ ...post, content: contentData });
  };

  // supabase로 업로드 이미지 관리
  const handleImage = async (file, callback) => {
    const { data, error } = await supabase.storage.from('posts').upload(`${postId}/${Date.now()}`, file);
    if (error) {
      console.error('Image upload failed:', error.message);
      return;
    }
    callback(`${supabaseUrl}/storage/v1/object/public/${data.fullPath}`);
  };
  const editorRef = useRef();

  // 카페 정보 관리
  const changeCafeInfo = e => {
    const { id, value } = e.target;
    setCafe({ ...cafe, [id]: value });
    handleCafeData({ ...cafe, [id]: value });
  };

  const handleCafeData = useCallback(
    _.debounce(info => setCafeData(info), 500),
    [],
  );

  // 데이터 전송
  const handleOnSubmit = () => {
    if (!post.title) {
      alert('타이틀을 입력해주세요');
      return;
    }
    if (!post.content) {
      alert('내용을 입력해주세요');
      return;
    }
    if (!post.cafe_address) {
      alert('카페 주소를 입력해주세요');
      return;
    }
    if (!cafe.cafeName) {
      alert('카페 상호명을 입력해주세요');
      return;
    }
    const createResult = async post => {
      await DATA_API.post('/articles', post);
    };

    createResult({ ...post, id: postId, cafe_name: cafe.cafeName, date: getNowDate() });
    navigate(`/detail?post_id=${postId}`);
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <div>
          <label htmlFor="title">제목</label>
          <select name="category" id="category" value={post.category} onChange={e => changeValue(e)}>
            <option value="24시 카페">24시 카페</option>
            <option value="분좋카">분위기 좋은 카페</option>
            <option value="모각코">조용한 모각코 카페</option>
            <option value="디저트">디저트 카페</option>
            <option value="뷰">뷰 좋은 카페</option>
            <option value="애견">애견동반 카페</option>
            <option value="한옥">한옥 카페</option>
          </select>
          <input type="text" name="title" id="title" onChange={e => changeValue(e)} />
        </div>

        <Editor
          initialValue={content ?? ' '}
          initialEditType="wysiwyg"
          autofocus={false}
          ref={editorRef}
          toolbarItems={toolbar}
          hideModeSwitch
          height="500px"
          hooks={{
            addImageBlobHook: handleImage,
          }}
          onChange={handleEditorChange}
        />

        <div className="cafeArea">
          <div>
            <label htmlFor="cafeName">카페 이름</label>
            <input
              type="text"
              name="cafe_name"
              id="cafeName"
              value={cafe.cafeName || ''}
              onChange={e => changeCafeInfo(e)}
            />
          </div>

          <div>
            <label htmlFor="cafeAddress">카페 주소</label>
            <input
              type="text"
              name="cafe_address"
              id="cafeAddress"
              value={cafe.cafeAddress || ''}
              onChange={e => changeCafeInfo(e)}
            />
          </div>

          <Map cafeData={cafeData} post={post} setPost={setPost} />
        </div>

        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default TuiEditor;
