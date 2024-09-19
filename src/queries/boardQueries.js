import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DATA_API } from '../api/api';

export const queryKeys = {
  boardController: {
    articles: () => ['articles'],
    users: () => ['users'],
  },
};

// 게시글 상세 불러오기
const fetchDetail = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const response = await DATA_API.get(`/articles/${id}`);
  return response.data;
};

export const useFetchDetail = id => {
  return useQuery({
    queryKey: [...queryKeys.boardController.articles(), id],
    queryFn: fetchDetail,
  });
};

// 게시글 삭제
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: id => DATA_API.delete(`/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.boardController.articles);
    },
  });
};

// 게시글 수정
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async updateData => {
      await DATA_API.patch(`/articles/${updateData.id}`, updateData.post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.boardController.articles);
    },
  });
};

// 유저 정보 불러오기
const fetchUser = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const response = await DATA_API.get(`/users/${id}`);
  return response.data;
};

export const useFetchUser = id => {
  return useQuery({
    queryKey: [...queryKeys.boardController.users(), id],
    queryFn: fetchUser,
  });
};

// 북마크 등록
export const useAddBookmark = setLoginUserData => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async userData => {
      const response = await DATA_API.get(`/users/${userData.id}`);
      const bookmarkList = response.data?.bookmarked;

      !bookmarkList
        ? await DATA_API.patch(`/users/${userData.id}`, {
            bookmarked: [userData.articleId],
          })
        : await DATA_API.patch(`/users/${userData.id}`, {
            bookmarked: [...bookmarkList, userData.articleId],
          });
    },
    onSuccess: () => {
      setLoginUserData(prevData => ({
        ...prevData,
        isBookmarked: true,
      }));
      queryClient.invalidateQueries(queryKeys.boardController.users);
    },
  });
};

// 북마크 삭제
export const useRemoveBookmark = setLoginUserData => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async userData => {
      const response = await DATA_API.get(`/users/${userData.id}`);
      const bookmarkList = response.data.bookmarked.filter(result => result !== userData.articleId);

      await DATA_API.patch(`/users/${userData.id}`, {
        bookmarked: [...bookmarkList],
      });
    },
    onSuccess: () => {
      setLoginUserData(prevData => ({
        ...prevData,
        isBookmarked: false,
      }));
      queryClient.invalidateQueries(queryKeys.boardController.articles);
    },
  });
};
