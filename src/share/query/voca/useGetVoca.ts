import { useQuery } from '@tanstack/react-query';

import { Request, Response } from '@/type/apiType';
import { VocaResponseJson } from '@/type/vocaType';

import axiosInstance from '../axios';

interface GetVocaId {
  vocaId: number;
}

export const getVoca = async (request: Request<null, GetVocaId>) => {
  try {
    const { data } = await axiosInstance.get<Response<VocaResponseJson>>(
      `/api/vocas/${request.id?.vocaId}`,
    );
    return data;
  } catch (error) {
    throw new Error('error while getting voca');
  }
};

export function useGetVoca(request: Request<null, GetVocaId>) {
  return useQuery({
    queryKey: [request.id?.vocaId],
    queryFn: () => getVoca(request),
    retryDelay: 300,
  });
}
