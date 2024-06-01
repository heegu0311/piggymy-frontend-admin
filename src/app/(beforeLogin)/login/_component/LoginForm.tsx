'use client';

import { notification } from 'antd';
import { FormEvent } from 'react';

import { useLogin } from '@/share/query/auth/useLogin';

export default function LoginForm() {
  const { mutate } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get('id')?.toString();
    const password = formData.get('password')?.toString();

    if (!id) {
      notification.error({
        message: 'ID를 입력해 주십시오',
      });
    } else if (!password) {
      notification.error({
        message: '비밀번호를 입력해 주십시오',
      });
    }

    if (id && password) {
      mutate({ data: { memberId: id, password: password } });
    }
  };

  return (
    <div className="flex h-full w-1/2 items-center p-12 pl-20 pr-20">
      <div className="h-5/6 w-full">
        <p className="text-4xl font-bold">관리자 로그인</p>
        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="flex w-full flex-row">
            <input
              type="text"
              className="mb-3 w-full rounded-3xl border-2 border-gray-5 p-2 pl-4"
              placeholder="Id"
              name="id"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="mb-3 w-full rounded-3xl border-2 border-gray-5 p-2 pl-4"
              placeholder="Pw"
              name="password"
            />
          </div>
          <div className="h-8 w-full border-b-[1px] border-gray-5 p-2 pt-0">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  name="saveId"
                  id="saveId"
                  className=" hover:cursor-pointer"
                />
                <label htmlFor="saveId">
                  <p className="pl-1.5 text-sm hover:cursor-pointer">
                    아이디 저장
                  </p>
                </label>
              </div>
              <p className="text-sm hover:cursor-pointer">
                아이디 / 비밀번호 찾기
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 h-14 w-full rounded-3xl bg-primary text-white"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
