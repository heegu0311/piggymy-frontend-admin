'use client';

import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import VocaForm from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/VocaForm';
import { useGetVoca } from '@/share/query/voca/useGetVoca';
import { useUpdateVoca } from '@/share/query/voca/useUpdateVoca';
import { VocaFormValue } from '@/type/vocaType';

interface UpdateVocaProps {
  vocaId: number;
}

export default function UpdateVoca({ vocaId }: UpdateVocaProps) {
  const params = useParams();
  const router = useRouter();
  const [form] = useForm();

  const { data, isError, isSuccess } = useGetVoca({
    id: { vocaId },
    data: null,
  });
  const { mutate: update } = useUpdateVoca();

  const initialValues = useMemo(
    () => ({
      koreanTitle: data?.data.koreanTitle ?? '',
      englishTitle: data?.data.englishTitle ?? '',
      koreanCategory: data?.data.koreanCategory ?? '',
      englishCategory: data?.data.englishCategory ?? '',
      isUse: data?.data.isUse ?? false,
      imagePath: data?.data.imagePath ?? '',
      imageName: data?.data.imageName ?? '',
      sourceName: data?.data.sourceName ?? '',
      sourceLink: data?.data.sourceLink ?? '',
      createdDate: data?.data.createdDate ?? '',
      content: data?.data.content ?? '',
      quizId: data?.data.quizId ?? undefined,
    }),
    [data],
  );

  const handleCancel = () => {
    form.setFieldsValue(initialValues);
  };

  const handleFinish = (formValue: VocaFormValue) => {
    const { image } = formValue;

    update({
      id: { vocaId: params.vocaId as string },
      data: {
        ...formValue,
        image,
        imageName: data?.data.imageName,
        imagePath: !!image && image.length > 0 ? data?.data.imagePath : '',
      },
    });
  };

  useEffect(() => {
    if (!data) return;

    form.setFieldsValue(initialValues);
  }, [data, form, initialValues]);

  useEffect(() => {
    if (isError) {
      router.push('/admin/quiz/vocaManagement');
    }
  }, [isError, router]);

  if (isSuccess) {
    const { createdDate, imagePath, imageName } = data.data;

    return (
      <VocaForm
        form={form}
        onCancel={handleCancel}
        onFinish={handleFinish}
        initialValues={{
          ...data.data,
          createdDate: dayjs(createdDate),
          image: imagePath + imageName,
        }}
      />
    );
  }
}
