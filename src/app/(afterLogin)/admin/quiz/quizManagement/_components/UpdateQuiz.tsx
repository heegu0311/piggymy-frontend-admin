'use client';

import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import QuizForm from '@/app/(afterLogin)/admin/quiz/quizManagement/_components/QuizForm';
import { useGetQuiz } from '@/share/query/quiz/useGetQuiz';
import { useUpdateQuiz } from '@/share/query/quiz/useUpdateQuiz';
import { QuizFormValue } from '@/type/quizType';

interface UpdateQuizProps {
  quizId: number;
}

export default function UpdateQuiz({ quizId }: UpdateQuizProps) {
  const params = useParams();
  const router = useRouter();
  const [form] = useForm();

  const { data, isError, isSuccess } = useGetQuiz({
    id: { quizId },
    data: null,
  });
  const { mutate: update } = useUpdateQuiz();

  const initialValues = useMemo(
    () => ({
      title: data?.data.title,
      answer: data?.data.answer,
      option1: data?.data.option1,
      option2: data?.data.option2,
      option3: data?.data.option3,
      option4: data?.data.option4,
      isUse: data?.data.isUse,
      createdDate: data?.data.createdDate,
      vocaId: data?.data.vocaId || undefined,
    }),
    [data],
  );

  const handleCancel = () => {
    form.setFieldsValue(initialValues);
  };

  const handleFinish = (formValue: QuizFormValue) => {
    update({
      id: { quizId: params.quizId as string },
      data: {
        ...formValue,
      },
    });
  };

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue(initialValues);
  }, [data, form, initialValues]);

  useEffect(() => {
    if (isError) {
      router.push('/admin/quiz/quizManagement');
    }
  }, [isError, router]);

  if (isSuccess) {
    const { createdDate } = data.data;

    return (
      <QuizForm
        initialValues={{
          ...data.data,
          createdDate: dayjs(createdDate),
        }}
        form={form}
        onCancel={handleCancel}
        onFinish={handleFinish}
      />
    );
  }
}
