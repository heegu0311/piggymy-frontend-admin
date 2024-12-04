import { useQuery } from '@tanstack/react-query';

import { Request, Response } from '@/type/apiType';
import { QuizResponseJson } from '@/type/quizType';

import axiosInstance from '../axios';

interface GetQuizId {
  quizId: number;
}

export const getQuizDetail = async (request: Request<null, GetQuizId>) => {
  try {
    const { data } = await axiosInstance.get<Response<QuizResponseJson>>(
      `/api/quizzes/${request.id?.quizId}`,
    );
    return data;
  } catch (error) {
    throw new Error('error while getting Quiz');
  }
};

export function useGetQuiz(request: Request<null, GetQuizId>) {
  return useQuery({
    queryKey: [request.id?.quizId],
    queryFn: () => getQuizDetail(request),
    retryDelay: 300,
  });
}
