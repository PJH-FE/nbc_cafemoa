import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const Comments = () => {
  const queryClient = useQueryClient();
  const [commentTexts, setCommentTexts] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('ceda');

  // useQuery 훅을 사용하여 comments 데이터 가져오기
  const { data: comments, isError: isCommentsError } = useQuery({
    queryKey: ['comments', selectedPostId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/comments?postId=${selectedPostId}`);
      return res.data;
    },
    enabled: !!selectedPostId,
  });

  // useMutation 훅을 사용하여 addComment 함수 정의
  const { mutate: addComment } = useMutation({
    mutationFn: async comment => {
      const res = await axios.post('http://localhost:5000/comments', comment);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  // 데이터 로딩 에러 발생 시 에러 메시지 표시
  if (isCommentsError) {
    return <div>에러가 발생했습니다...</div>;
  }

  return (
    <>
      <p className="px-10">댓글</p>
      <form
        onSubmit={e => {
          e.preventDefault();
          addComment({
            text: commentTexts || '',
            postId: 'ceda',
          });
          setCommentTexts('');
        }}
        className="px-10"
      >
        <div className="flex flex-col px-10">
          <textarea
            type="text"
            placeholder="댓글을 입력하세요.."
            value={commentTexts}
            onChange={e => {
              setCommentTexts(e.target.value);
            }}
            className="rounded border-2 border-gray-400 resize-none"
          />
          <button className="flex justify-center align-end bg-[#2c2c2c] text-white w-20 rounded">
            댓글 추가
          </button>
        </div>
      </form>
      <div className="px-10">
        {selectedPostId === 'ceda' && (
          <div>
            {comments?.map(comment => {
              return <p key={comment.id}>{comment.text}</p>;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Comments;
