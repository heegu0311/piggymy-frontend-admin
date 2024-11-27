import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';

import { Request, Response } from '@/type/apiType';
import { BannerRequestJson } from '@/type/bannerType';

import axiosInstance from '../axios';

interface UpdateBannerId {
  bannerId: number;
}

interface UpdateBannerRequestJson extends BannerRequestJson {
  imagePath?: string;
  imageName?: string;
}

export const updateBanner = async (
  request: Request<UpdateBannerRequestJson, UpdateBannerId>,
) => {
  const {
    title,
    type,
    buttonName,
    moveQuizId,
    moveVocaId,
    exposureEndDate,
    exposureStartDate,
    image,
    imageName,
    imagePath,
    isUse,
  } = request.data;

  const formData = new FormData();
  if (image && image.length > 0 && image[0].originFileObj) {
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
        exposureStartDate: exposureStartDate.format('YYYY-MM-DD'),
        exposureEndDate: exposureEndDate.format('YYYY-MM-DD'),
        imagePath: imagePath,
        imageName: imageName,
        isUse: isUse,
      }),
    ],
    { type: 'application/json' },
  );

  formData.append('banner', bannerBlob);

  const response = await axiosInstance.put<Response<null>>(
    `/api/banners/${request.id?.bannerId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export function useUpdateBanner(bannerId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBanner,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['banners'] });
      await queryClient.invalidateQueries({ queryKey: [bannerId] });
      notification.success({
        message: '배너 수정 성공',
      });
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '배너 수정 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
