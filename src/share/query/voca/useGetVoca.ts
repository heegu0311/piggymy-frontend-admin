import { useQuery } from '@tanstack/react-query';

import { Request, Response } from '@/type/apiType';
import { VocaResponseJson } from '@/type/vocaType';

import axiosInstance from '../axios';

export const getVocaDetail = async (request: Request<string>) => {
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

export function useGetVoca(vocaId: string) {
  return useQuery({
    queryKey: ['voca', vocaId],
    queryFn: () => getVocaDetail({ data: vocaId }),
    retryDelay: 300,
  });
}
