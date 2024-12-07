import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Request, Response } from '@/type/apiType';

import axiosInstance from '../axios';

interface GetQuizListRequestQuery {
  page?: number;
  page_size?: number;
  sort_type?: 'CREATED' | 'MODIFIED';
  search_type?: 1 | 2;
  search_keyword?: string;
  start_date?: string;
  end_date?: string;
  is_use?: string | null;
}

interface GetQuizListResponse {
  totalCount: number;
  list: {
    id: number;
    title: string;
    isUse: boolean;
    createdDate: string;
    modifiedDate: string;
  }[];
}

const removeNullValues = (obj: GetQuizListRequestQuery) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined),
  );
};

export const getQuizList = async (
  request: Request<GetQuizListRequestQuery>,
) => {
  const filteredParams = removeNullValues(request.data);

  const response = await axiosInstance.get<Response<GetQuizListResponse>>(
    `/api/quizzes`,
    {
      params: filteredParams,
    },
  );

  return response.data;
};

export function useGetQuizList(request: Request<GetQuizListRequestQuery>) {
  return useQuery<Response<GetQuizListResponse>, AxiosError<{ error: string }>>(
    {
      queryKey: ['quizzes', request?.data],
      queryFn: () => getQuizList(request),
      retry: 1,
    },
  );
}

// export function prefetchQuizList(
//   queryClient: QueryClient,
//   request: Request<GetQuizListRequestQuery>,
// ) {
//   return queryClient.prefetchQuery({
//     queryKey: ['quizzes', request?.data],
//     queryFn: () => getQuizList(request),
//   });
// }
