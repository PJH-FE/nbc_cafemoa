import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DATA_API } from '../api/api';

export const queryKeys = {
  boardController: {
    articles: () => ['articles'],
  },
};

// 게시글 불러오기
const fetchDetail = async () => {
  const response = await DATA_API.get('/articles');
  return response.data;
};

export const useFetchDetail = () => {
  return useQuery({
    queryKey: queryKeys.boardController.articles(),
    queryFn: fetchDetail,
  });
};

// 게시글 삭제
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: id => DATA_API.delete(`/results/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.boardController.articles);
    },
  });
};

// 공개/비공개 전환
export const useChangeVisible = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async id => {
      const response = await DATA_API.get('/results');
      const nowVisible = response.data.filter(result => {
        return result.id === id;
      });

      await DATA_API.patch(`/results/${id}`, {
        visibility: !nowVisible[0].visibility,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.testController.results);
    },
  });
};
