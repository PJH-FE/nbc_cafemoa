import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DATA_API } from '../api/api';

export const queryKeys = {
  boardController: {
    articles: () => ['articles'],
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
