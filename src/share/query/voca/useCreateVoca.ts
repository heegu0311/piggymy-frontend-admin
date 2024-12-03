import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { Request, Response } from '@/type/apiType';
import { CreateVocaRequestJson } from '@/type/vocaType';

import axiosInstance from '../axios';

export const createVoca = async (vocaData: Request<CreateVocaRequestJson>) => {
  const {
    koreanTitle,
    englishTitle,
    koreanCategory,
    englishCategory,
    content,
    createdDate,
    sourceName,
    sourceLink,
    imageName,
    imagePath,
    isUse,
    image,
  } = vocaData.data;

  const formData = new FormData();
  if (image && image[0].originFileObj) {
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
        koreanTitle: koreanTitle || '가나다',
        englishTitle: englishTitle || '',
        koreanCategory: koreanCategory || 'ㄱ',
        englishCategory: englishCategory || 'a',
        content: content || '',
        createdDate: createdDate || '',
        sourceName: sourceName || '',
        sourceLink: sourceLink || '',
        imageName: imageName || '',
        imagePath: imagePath || '',
        isUse: isUse,
      }),
    ],
    { type: 'application/json' },
  );

  formData.append('voca', vocaBlob);

  const response = await axiosInstance.post<Response<{ id: number }>>(
    `/api/vocas`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export function useCreateVoca() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVoca,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['vocas'] });
      notification.success({
        message: '용어 생성 성공',
      });
      router.push(`/admin/quiz/vocaManagement/${data.data.id}`);
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '용어 생성 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
