import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';

import { Request, Response } from '@/type/apiType';

import axiosInstance from '../axios';

interface UpdateGreetingRequestJson {
  id: string;
  message: string;
  exposureDuration: [string, string];
}

export const updateGreeting = async (
  greetingData: Request<UpdateGreetingRequestJson>,
) => {
  const { id, message, exposureDuration } = greetingData.data;

  const response = await axiosInstance.patch<UpdateGreetingRequestJson>(
    `/api/greetings`,
    {
      id,
      message,
      exposureDuration,
    },
  );

  return response.data;
};

interface UseUpdateGreetingProps {
  onSuccess?: () => void;
}

export function useUpdateGreeting({ onSuccess }: UseUpdateGreetingProps) {
  return useMutation({
    mutationFn: updateGreeting,
    onSuccess: () => {
      onSuccess && onSuccess();

      notification.success({
        message: '그리팅 메시지 수정 성공',
      });
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '그리팅 메시지 수정 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
