'use client';

import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';

import VocaForm from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/VocaForm';
import { useCreateVoca } from '@/share/query/voca/useCreateVoca';
import { VocaFormValue } from '@/type/vocaType';

export default function CreateVoca() {
  const [form] = useForm();

  const { mutate: create } = useCreateVoca();

  const initialValues = useMemo(
    () => ({
      createdDate: dayjs().format('YYYY-MM-DD'),
    }),
    [],
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleCancel = () => {
    form.resetFields();
  };

  const handleFinish = (formValue: VocaFormValue) => {
    create({ data: formValue });
    form.resetFields();
  };

  return (
    <VocaForm form={form} onCancel={handleCancel} onFinish={handleFinish} />
  );
}
