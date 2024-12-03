import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { buildQueryStringForIds } from '@/share/utils/query';
import { Request, Response } from '@/type/apiType';

import axiosInstance from '../axios';

export const deleteVocaList = async (
  deleteData: Request<{
    vocaIds: number[];
  }>,
) => {
  const response = await axiosInstance.delete<Response<number>>(
    `/api/vocas?${buildQueryStringForIds(deleteData.data.vocaIds)}`,
  );

  return response.data;
};

export function useDeleteVocas() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVocaList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vocas'] });
      notification.success({
        message: '용어 삭제 성공',
      });
      router.push('/admin/quiz/vocaManagement');
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '용어 삭제 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
