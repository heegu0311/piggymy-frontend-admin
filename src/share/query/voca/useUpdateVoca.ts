import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';

import { buildQueryStringForIds } from '@/share/utils/query';
import { Request, Response } from '@/type/apiType';
import { VocaRequestJson } from '@/type/vocaType';

import axiosInstance from '../axios';

interface UpdateVocaId {
  vocaId: string;
}

interface UpdateVocaRequestJson extends VocaRequestJson {
  imagePath?: string;
  imageName?: string;
}

export const updateVoca = async (
  request: Request<UpdateVocaRequestJson, UpdateVocaId>,
) => {
  const {
    koreanTitle,
    englishTitle,
    koreanCategory,
    englishCategory,
    content,
    sourceName,
    sourceLink,
    imagePath,
    imageName,
    isUse,
    image,
    quizId,
  } = request.data;

  const formData = new FormData();
  if (!!image && image.length > 0 && image[0].originFileObj) {
    formData.append(
      'thumbnail',
      image[0].originFileObj,
      image[0].originFileObj?.name,
    );
  } else {
    formData.append('thumbnail', '');
  }

  const vocaBlob = new Blob(
    [
      JSON.stringify({
        koreanTitle: koreanTitle,
        englishTitle: englishTitle,
        koreanCategory: koreanCategory || 'ㄱ',
        englishCategory: englishCategory || 'a',
        content: content || '',
        sourceName: sourceName || 'abc',
        sourceLink: sourceLink || 'abc',
        imagePath,
        imageName,
        isUse: isUse,
        quizId: quizId || null,
      }),
    ],
    { type: 'application/json' },
  );

  formData.append('voca', vocaBlob);

  const response = await axiosInstance.put<Response<number>>(
    `/api/vocas/${request.id?.vocaId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export function useUpdateVoca() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateVoca'],
    mutationFn: updateVoca,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['vocas'] });
      notification.success({
        message: '용어 수정 성공',
      });
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '용어 수정 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}

export const patch = async (
  request: Request<{ vocaIds: number[]; attr: string; value: any }>,
) => {
  const response = await axiosInstance.patch<Response<null>>(
    `/api/vocas?${buildQueryStringForIds(request.data.vocaIds)}`,
    request.data,
  );

  return response.data;
};

export function usePatchVocasIsUse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['vocas'] });
      notification.success({
        message: '용어 사용여부 변경 성공',
      });
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '용어 사용여부 변경 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
