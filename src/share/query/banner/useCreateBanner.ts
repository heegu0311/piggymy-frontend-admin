import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { Request, Response } from '@/type/apiType';
import { BannerRequestJson } from '@/type/bannerType';

import axiosInstance from '../axios';

interface CreateBannerRequestJson extends BannerRequestJson {}

export const createBanner = async (
  request: Request<CreateBannerRequestJson>,
) => {
  const {
    title,
    type,
    buttonName,
    moveQuizId,
    moveVocaId,
    exposureEndDate,
    exposureStartDate,
    createdDate,
    image,
    isUse,
  } = request.data;

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

  const bannerBlob = new Blob(
    [
      JSON.stringify({
        type: type,
        title: title,
        buttonName: buttonName,
        moveQuizId: moveQuizId || null,
        moveVocaId: moveVocaId || null,
        isUse: isUse,
        exposureStartDate: exposureStartDate.format('YYYY-MM-DD'),
        exposureEndDate: exposureEndDate.format('YYYY-MM-DD'),
        createdDate,
      }),
    ],
    { type: 'application/json' },
  );

  formData.append('banner', bannerBlob);

  const response = await axiosInstance.post<Response<{ id: number }>>(
    `/api/banners`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export function useCreateBanner() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBanner,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['banners'] });
      notification.success({
        message: '배너 생성 성공',
      });

      router.push(`/admin/content/rollingBanner/${response.data.id}`);
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '배너 생성 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
