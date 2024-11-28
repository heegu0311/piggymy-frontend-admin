'use client';

import { UploadFile } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

import VocaForm from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/VocaForm';
import { useGetVoca } from '@/share/query/voca/useGetVoca';
import { useUpdateVoca } from '@/share/query/voca/useUpdateVoca';
import { UpdateVocaRequestJson } from '@/type/vocaType';

export default function UpdateVoca() {
  const params = useParams();
  const router = useRouter();
  const [form] = useForm();

  const { data, isError } = useGetVoca(params.vocaId as string);
  const { mutate: update } = useUpdateVoca();

  const initialValues = useMemo(
    () => ({
      koreanTitle: data?.koreanTitle ?? '',
      englishTitle: data?.englishTitle ?? '',
      koreanCategory: data?.koreanCategory ?? '',
      englishCategory: data?.englishCategory ?? '',
      isUse: data?.isUse ?? false,
      image:
        data?.thumbnailPath && data?.thumbnailName
          ? ([
              { url: data?.thumbnailPath + data?.thumbnailName },
            ] as UploadFile[])
          : [],
      thumbnailPath: data?.thumbnailPath ?? '',
      thumbnailName: data?.thumbnailName ?? '',
      sourceName: data?.sourceName ?? '',
      sourceLink: data?.sourceLink ?? '',
      thumbnailSourceName: data?.thumbnailSourceName ?? '',
      thumbnailSourceLink: data?.thumbnailSourceLink ?? '',
      createdDate: data?.createdDate ?? '',
      content: data?.content ?? '',
      quizId: data?.quizId ?? undefined,
    }),
    [data],
  );

  const handleCancel = () => {
    form.setFieldsValue(initialValues);
  };

  const handleFinish = (formValue: UpdateVocaRequestJson) => {
    if (
      formValue.image &&
      formValue.image.length > 0 &&
      formValue.image[0].url ===
        String(data?.thumbnailPath) + String(data?.thumbnailName)
    ) {
      update({
        id: +params.vocaId,
        data: {
          ...formValue,
          vocaId: +params.vocaId,
          image: [],
          thumbnailPath: String(data?.thumbnailPath),
          thumbnailName: String(data?.thumbnailName),
        },
      });
    } else {
      update({
        id: +params.vocaId,
        data: {
          ...formValue,
          vocaId: +params.vocaId,
          thumbnailPath: '',
          thumbnailName: '',
        },
      });
    }
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

  return (
    <VocaForm
      initialValues={initialValues}
      form={form}
      onCancel={handleCancel}
      onFinish={handleFinish}
    />
  );
}
