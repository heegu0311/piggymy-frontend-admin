import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { Dayjs } from 'dayjs';

import { Request, Response } from '@/type/apiType';

import axiosInstance from '../axios';

interface CreateGreetingRequestJson {
  message: string;
  exposureStartDate: Dayjs;
  exposureEndDate: Dayjs;
}

export const createGreeting = async (
  greetingData: Request<CreateGreetingRequestJson>,
) => {
  const { message, exposureEndDate, exposureStartDate } = greetingData.data;
  const response = await axiosInstance.post<Response<null>>(`/api/greetings`, {
    message: message,
    exposureStartDate: exposureStartDate.format('YYYY-MM-DD'),
    exposureEndDate: exposureEndDate.format('YYYY-MM-DD'),
  });

  return response.data;
};

interface UseCreateGreetingProps {
  onSuccess?: () => void;
}

export function useCreateGreeting({ onSuccess }: UseCreateGreetingProps) {
  return useMutation({
    mutationFn: createGreeting,
    onSuccess: () => {
      onSuccess && onSuccess();
      console.log(1);

      notification.success({
        message: '그리팅 메시지 생성 성공',
      });
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      console.log(2);
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '그리팅 메시지 생성 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}
