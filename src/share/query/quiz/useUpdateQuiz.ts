import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';

import { buildQueryStringForIds } from '@/share/utils/query';
import { Request, Response } from '@/type/apiType';
import { QuizRequestJson } from '@/type/quizType';

import axiosInstance from '../axios';

interface UpdateQuizId {
  quizId: string;
}

interface UpdateQuizRequestJson extends QuizRequestJson {
  imagePath?: string;
  imageName?: string;
}

export const updateQuiz = async (
  request: Request<UpdateQuizRequestJson, UpdateQuizId>,
) => {
  const formData = new FormData();

  const quizBlob = new Blob([JSON.stringify(request.data)], {
    type: 'application/json',
  });

  formData.append('quiz', quizBlob);

  const response = await axiosInstance.put<Response<number>>(
    `/api/quizzes/${request.id?.quizId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateQuiz'],
    mutationFn: updateQuiz,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      notification.success({
        message: '퀴즈 수정 성공',
      });
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '퀴즈 수정 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}

export const patch = async (
  request: Request<{ quizIds: number[]; attr: string; value: any }>,
) => {
  const response = await axiosInstance.patch<Response<null>>(
    `/api/quizzes?${buildQueryStringForIds(request.data.quizIds)}`,
    request.data,
  );

  return response.data;
};

export function usePatchQuizzesIsUse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      notification.success({
        message: '퀴즈 사용여부 변경 성공',
      });
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '퀴즈 사용여부 변경 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
