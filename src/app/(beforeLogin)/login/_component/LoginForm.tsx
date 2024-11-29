'use client';

import { notification } from 'antd';
import { FormEvent, useEffect } from 'react';

import { useModal } from '@/share/modal/useModal';
import { useLogin } from '@/share/query/auth/useLogin';
import Button from '@/share/ui/button/Button';

export default function LoginForm() {
  const { mutate } = useLogin();

  const { openModal, closeModal } = useModal();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get('id')?.toString();
    const pw = formData.get('pw')?.toString();

    if (!id) {
      notification.error({
        message: 'ID를 입력해 주십시오',
      });
    } else if (!pw) {
      notification.error({
        message: '비밀번호를 입력해 주십시오',
      });
    }

    if (id && pw) {
      mutate({ data: { id, pw } });
    }
  };

  useEffect(() => {
    openModal(
      'loginGuide',
      <div className={'flex flex-col items-center justify-center gap-2'}>
        <p>로그인을 위해 아이디 test, 비밀번호 1234를 입력하세요</p>
        <p>현재 API 개발중인 상태입니다!</p>
        <Button onClick={() => closeModal('loginGuide')}>닫기</Button>
      </div>,
    );
  }, []);

  return (
    <div className="flex h-full items-center justify-center bg-white  pl-20 pr-20">
      <div className="w-full">
        <p className="text-2xl font-bold">관리자 로그인</p>
        <form className="mt-5" onSubmit={handleSubmit} method={'POST'}>
          <div className="flex w-full flex-row">
            <input
              type="text"
              className="mb-3 w-full rounded-3xl border-2 border-gray-5 p-2 pl-4"
              placeholder="ID"
              name="id"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="mb-3 w-full rounded-3xl border-2 border-gray-5 p-2 pl-4"
              placeholder="PW"
              name="pw"
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
