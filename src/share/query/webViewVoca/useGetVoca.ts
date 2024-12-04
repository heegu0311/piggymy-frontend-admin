import { QueryClient, useQuery } from '@tanstack/react-query';

import axiosInstance from '@/share/query/axios';
import { Request, Response } from '@/type/apiType';
import { VocaResponseJson } from '@/type/vocaType';

export const getVoca = async (request: Request<number>) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get<Response<VocaResponseJson>>(
      `/api/vocas/${request.data}`,
    );
    return data;
  } catch (error) {
    throw new Error('error while getting voca');
  }
};

export function useGetVoca(vocaId: number) {
  return useQuery({
    queryKey: ['voca', vocaId],
    queryFn: () => getVoca({ data: vocaId }),
    retryDelay: 300,
  });
}

export function prefetchVoca(queryClient: QueryClient, data: Request<number>) {
  return queryClient.prefetchQuery({
    queryKey: ['voca', data.data],
    queryFn: () => getVoca(data),
  });
}
