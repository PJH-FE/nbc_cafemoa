import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { supabase, supabaseUrl } from '../../supabase/supabase';
import Map from './Map';
import { DATA_API } from '../../api/api';
import getNowDate from '../../utils/getNowDate';
import { useUpdatePost } from '../../queries/boardQueries';
import FormInput from './FormInput';
import { categoryList } from '../../data/category';
import useUserStore from '../../zustand/bearStore';
import { toast } from 'react-toastify';

const toolbar = [['heading', 'bold', 'italic', 'strike'], ['hr', 'quote', 'ul', 'ol'], ['image']];

const initialState = {
  category: categoryList[0],
  title: '',
  content: '',
  author_id: '',
  date: '',
  cafe_address: '',
  region: '',
};

function TuiEditor({ content, isEdit = false }) {
  const [postId] = useState(crypto.randomUUID());
  const [post, setPost] = useState(content || initialState);
  const [cafeData, setCafeData] = useState({ cafe_address: content?.cafe_address || '' });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const nowPostId = searchParams.get('article_id');
  const updatePost = useUpdatePost();

  // 로그인 한 유저 정보
  const userInfo = useUserStore(state => state.getUserInfo());
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (userInfo) {
      const userId = userInfo.user_id;
      const getUserDataId = async () => {
        const { data: userData, isError } = await DATA_API.get(`/users?user_id=${userId}`);
        if (isError) return;
        setUserId(userData[0].id);
      };
      getUserDataId();
    }
  }, []);

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
  const handleCafeData = useCallback(
    _.debounce(info => setCafeData(info), 1000),
    [],
  );
  const changeCafeInfo = e => {
    const { id, value } = e.target;
    handleCafeData({ [id]: value });
  };

  // 데이터 전송
  const handleOnSubmit = () => {
    if (!post.title) {
      toast.error('타이틀을 입력해주세요');
      return;
    }
    if (!post.content) {
      toast.error('내용을 입력해주세요');
      return;
    }
    if (!post.cafe_address) {
      toast.error('카페 주소를 입력해주세요');
      return;
    }
    if (!post.cafe_name) {
      toast.error('카페 상호명을 입력해주세요');
      return;
    }
    const createResult = async post => {
      await DATA_API.post('/articles', post);
      navigate(`/detail?article_id=${postId}`);
    };

    const updateResult = () => {
      updatePost.mutate({ id: nowPostId, post: { ...post } });
      navigate(`/detail?article_id=${nowPostId}`);
    };

    {
      isEdit
        ? updateResult({ post })
        : createResult({ ...post, author_id: userId, id: postId, date: getNowDate() });
    }
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleOnSubmit();
        }}
        className="flex flex-col max-w-screen-xl gap-6 mx-auto max-w-[1500px] py-[60px] sm:px-[16px] sm:py-[48px]"
      >
        <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-[30px] py-6">
          {/* <label htmlFor="title" className="text-2xl min-w-24">
            제목
          </label> */}

          <select
            className="border border-[#61443A] px-[20px] py-[10px] rounded-[6px]"
            name="category"
            id="category"
            className="border-[1px] h-9 px-2 border-black outline-none rounded-[4px]"
            value={post.category}
            onChange={e => changeValue(e)}
          >
            {categoryList.map(category => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>

          <FormInput
            type={'text'}
            name={'title'}
            placeholder="제목을 입력하세요"
            value={post.title || ''}
            onChange={e => {
              changeValue(e);
            }}
          />
        </div>

        <Editor
          initialValue={post.content || ' '}
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

        <div className="flex flex-wrap items-center gap-[30px] pt-[60px]">
          <div className="flex flex-col items-start w-full md:w-[calc(50%-8px)] gap-4">
            <label htmlFor="cafe_name" className="text-[18px] text-[#61443A]">
              카페 이름
            </label>

            <FormInput
              type={'text'}
              name={'cafe_name'}
              placeholder="카페 이름을 입력하세요"
              value={post.cafe_name || ''}
              onChange={e => {
                changeValue(e);
              }}
            />
          </div>

          <div className="flex flex-col items-start w-full md:w-[calc(50%-8px)] gap-4">
            <label htmlFor="cafe_address" className="text-[18px] text-[#61443A]">
              카페 주소
            </label>
            <FormInput
              type={'text'}
              name={'cafe_address'}
              placeholder="카페 주소를 입력하세요"
              value={post.cafe_address || ''}
              onChange={e => {
                changeValue(e);
                changeCafeInfo(e);
              }}
            />
          </div>

          <Map cafeData={cafeData} post={post} setPost={setPost} />
        </div>

        <button type="submit" className="bg-[#61443A] text-[#fff] py-[16px] rounded-[6px]">
          {isEdit ? '수정' : '등록'}
        </button>
      </form>
    </>
  );
}

export default TuiEditor;
