import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DATA_API } from '../api/api';
import useUserStore from '../zustand/bearStore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Comments = ({ nowArticleId }) => {
  const queryClient = useQueryClient();

  const [commentTexts, setCommentTexts] = useState(''); // 새로운 댓글 내용
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editContent, setEditContent] = useState(''); // 수정할 댓글 내용

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

  // useQuery 훅을 사용하여 comments 데이터 가져오기
  const {
    data: comments,
    isPending: isCommentsPending,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ['comments', nowArticleId],
    queryFn: async () => {
      const res = await DATA_API.get(`/comments?postId=${nowArticleId}`);
      return res.data;
    },
    enabled: !!nowArticleId,
  });

  // useMutation 훅을 사용하여 addComment 함수 정의
  const { mutate: addComment } = useMutation({
    mutationFn: async comment => {
      const res = await DATA_API.post('/comments', comment);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  // useMutation 훅을 사용하여 editComment 함수 정의
  const { mutate: editComment } = useMutation({
    mutationFn: async updatedComment => {
      const res = await DATA_API.patch(`/comments/${updatedComment.id}`, updatedComment);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', nowArticleId]);
      setEditingCommentId(null);
    },
  });

  // useMutation 훅을 사용하여 deleteComment 함수 정의
  const { mutate: deleteComment } = useMutation({
    mutationFn: async id => {
      await DATA_API.delete(`/comments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', nowArticleId]);
    },
  });

  // 댓글 추가 처리
  const handleAddComment = () => {
    if (!commentTexts) {
      toast.error('댓글을 입력해주세요');
      return;
    } // 빈 내용 방지
    addComment({
      text: commentTexts,
      author_id: userId,
      postId: nowArticleId,
      user_nickname: userInfo.user_nickname,
      date: new Date().toISOString(),
    });
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
      {/* 댓글 입력 폼 */}
      <div className="sub-title pb-3 mt-[120px] mb-4 border-b-2 border-b-primary01">댓글</div>
      {userInfo?.id && (
        <div className="flex flex-col mb-16">
          <textarea
            type="text"
            placeholder="댓글을 입력하세요.."
            value={commentTexts}
            onChange={e => {
              setCommentTexts(e.target.value);
            }}
            className="border-2 border-primary01 px-3 py-3 text-lg outline-none rounded resize-none"
          ></textarea>
          <button
            type="submit"
            onClick={handleAddComment}
            className="ml-auto text-lg bg-primary01 text-white w-fit px-6 py-2 rounded mt-4 hover:shadow-xl transition-shadow "
          >
            댓글 추가
          </button>
        </div>
      )}

      {/* 댓글목록 */}
      <div className="comment-area">
        {comments.length > 0 ? (
          comments?.map(comment => {
            return (
              <div
                key={comment.id}
                className="flex items-center justify-between py-4 px-4 even:bg-primary03 border-b-2 first:border-t-2 border-primary01"
              >
                {/* 수정모드일 때 */}
                {editingCommentId === comment.id ? (
                  <>
                    <textarea
                      rows={'1'}
                      cols={'50'}
                      type="text"
                      placeholder="수정할 댓글을 입력하세요.."
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="rounded border-2 border-primary01 w-4/5 min-h-10 px-2 py-1 outline-none text-lg resize-none " // w, h 지우면 rows,cols가 의미가 없어짐
                    />

                    <div className="flex items-end gap-4">
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="w-20 border-2 border-primary01 rounded-full hover:border-primary01 hover:bg-primary01 hover:text-white"
                      >
                        완료
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="w-20 border-2 border-[#61443A] rounded-full hover:bg-[#61443A] hover:text-white"
                      >
                        취소
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <span className="text-lg">{comment.text}</span>{' '}
                      <Link to={`/profile/${comment.author_id}`} className="text-primary02 text-base">
                        {comment.user_nickname}
                      </Link>
                    </div>

                    {userInfo?.id === comment.author_id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditContent(comment.text); // 수정 모드로 전환
                          }}
                          className="w-fit px-4 py-1 border-2 border-primary01 rounded-[4px] bg-white hover:bg-primary01 hover:text-white duration-300"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="w-fit px-4 py-1 border-2 border-primary01 rounded-[4px] bg-primary01 text-white hover:bg-white hover:text-primary01 duration-300"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded  bg-primary03 font-bold text-primary01 text-xl w-full py-8 px-6">
            작성된 댓글이 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default Comments;
