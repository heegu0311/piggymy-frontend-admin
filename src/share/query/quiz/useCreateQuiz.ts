import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { Request, Response } from '@/type/apiType';
import { CreateQuizRequestJson } from '@/type/quizType';

import axiosInstance from '../axios';

export const createQuiz = async (quizData: Request<CreateQuizRequestJson>) => {
  const { vocaId, title, answer, option1, option2, option3, option4, isUse } =
    quizData.data;

  const formData = new FormData();

  // vocaId?: number;
  // title: string;
  // answer: string;
  // option1: string;
  // option2: string;
  // option3: string;
  // option4: string;
  // isUse: boolean;
  // quizHistoryCount?: number;
  // bookmarkCount?: number;
  // createdDate: string;
  // modifiedDate?: string;
  // hit?: number;
  // bookmark?: boolean;

  const quizBlob = new Blob(
    [
      JSON.stringify({
        title: title || '',
        answer: answer || 'ㄱ',
        option1: option1 || 'a',
        option2: option2 || '',
        option3: option3 || '',
        option4: option4 || '',
        isUse: isUse || '',
        vocaId: vocaId || null,
      }),
    ],
    { type: 'application/json' },
  );

  formData.append('quiz', quizBlob);

  const response = await axiosInstance.post<Response<{ id: number }>>(
    `/api/quizzes`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export function useCreateQuiz() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      notification.success({
        message: '퀴즈 생성 성공',
      });
      router.push(`/admin/quiz/quizManagement/${data.data.id}`);
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '퀴즈 생성 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
