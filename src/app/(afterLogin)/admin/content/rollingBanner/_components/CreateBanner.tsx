'use client';

import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { useCreateBanner } from '@/share/query/banner/useCreateBanner';
import { BannerFormValue } from '@/type/bannerType';

import BannerForm from './BannerForm';

dayjs.extend(utc);

export default function CreateBanner() {
  const [form] = useForm();
  const { mutate: create } = useCreateBanner();

  const handleSubmit = (formValue: BannerFormValue) => {
    create({
      data: {
        ...formValue,
        exposureEndDate: formValue.exposureDuration[1],
        exposureStartDate: formValue.exposureDuration[0],
        createdDate: dayjs().format(),
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <BannerForm
      form={form}
      mode="create"
      onDelete={handleCancel}
      onSubmit={handleSubmit}
    />
  );
}
