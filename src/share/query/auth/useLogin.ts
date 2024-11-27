'use client';

import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { Request, Response } from '@/type/apiType';

import axiosInstance from '../axios';

export interface LoginRequestJson {
  id: string;
  pw: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  memberName: string;
}

export const login = async (loginData: Request<LoginRequestJson>) => {
  const response = await axiosInstance.post<Response<LoginResponse>>(
    `/api/members/login`,
    loginData.data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setCookie('accessToken', data.data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
      });
      setCookie('refreshToken', data.data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
      });
      setCookie('memberName', data.data.memberName, {
        maxAge: 30 * 24 * 60 * 60,
      });
      router.push('/admin');
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '로그인 실패',
          description: `로그인이 실패했습니다!`,
        });
      }
    },
  });
}
