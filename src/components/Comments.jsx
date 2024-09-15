import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const Comments = () => {
  const queryClient = useQueryClient();

  const [commentTexts, setCommentTexts] = useState(''); // 새로운 댓글 내용
  const [selectedPostId, setSelectedPostId] = useState('ceda');
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editContent, setEditContent] = useState(''); // 수정할 댓글 내용

  // useQuery 훅을 사용하여 comments 데이터 가져오기
  const {
    data: comments,
    isPending: isCommentsPending,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ['comments', selectedPostId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/comments?postId=${selectedPostId}`);
      return res.data;
    },
    enabled: !!selectedPostId,
  });

  console.log('comments:', comments);
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

  // useMutation 훅을 사용하여 editComment 함수 정의
  const { mutate: editComment } = useMutation({
    mutationFn: async updatedComment => {
      const res = await axios.patch(`http://localhost:5000/comments/${updatedComment.id}`, updatedComment);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', selectedPostId]);
      setEditingCommentId(null);
    },
  });

  // useMutation 훅을 사용하여 deleteComment 함수 정의
  const { mutate: deleteComment } = useMutation({
    mutationFn: async id => {
      await axios.delete(`http://localhost:5000/comments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', selectedPostId]);
    },
  });

  // 댓글 추가 처리
  const handleAddComment = () => {
    if (!commentTexts) return; // 빈 내용 방지
    addComment({ text: commentTexts, postId: 'ceda' });
    setCommentTexts(''); // 입력 필드 초기화
  };

  // 댓글 수정 처리
  const handleEditComment = comment => {
    editComment({ ...comment, text: editContent });
  };

  // 댓글 삭제 처리
  const handleDeleteComment = id => {
    deleteComment(id);
  };

  // 댓글목록 로딩 중일 때 로딩 메시지 표시
  if (isCommentsPending) {
    return <div>로딩중입니다...</div>;
  }
  // 댓글목록 로딩 에러 발생 시 에러 메시지 표시
  if (isCommentsError) {
    return <div>에러가 발생했습니다...</div>;
  }

  return (
    <>
      <div className="flex justify-between px-10">
        <p>댓글</p>
      </div>
      <div className="px-10">
        <div className="flex flex-col px-10">
          <textarea
            type="text"
            placeholder="댓글을 입력하세요.."
            value={commentTexts}
            onChange={e => {
              setCommentTexts(e.target.value);
            }}
            className="rounded border-2 border-gray-400 resize-none"
          ></textarea>
          <button
            type="submit"
            onClick={handleAddComment}
            className="flex justify-center align-end bg-[#2c2c2c] text-white w-20 rounded"
          >
            댓글 추가
          </button>
        </div>
      </div>
      <div className="px-10">
        {comments?.map(comment => {
          return (
            <div key={comment.id}>
              {editingCommentId === comment.id ? (
                <>
                  <p>{comment.text}</p>
                  <textarea value={editContent} onChange={e => setEditContent(e.target.value)} />
                  <button onClick={() => handleEditComment(comment)}>수정 완료</button>
                  <button onClick={() => setEditingCommentId(null)}>취소</button>
                </>
              ) : (
                <>
                  <p>{comment.text}</p>
                  <button
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditContent(comment.content); // 수정 모드로 전환
                    }}
                    className="w-14 rounded-full border-2 border-gray-400 hover:border-green-500"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="w-14 rounded-full border-2 border-stone-600 hover:border-red-500"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
