'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';

import { useDeleteBanner } from '@/share/query/banner/useDeleteBanner';
import { useGetBanner } from '@/share/query/banner/useGetBanner';
import { useUpdateBanner } from '@/share/query/banner/useUpdateBanner';
import { BannerFormValue } from '@/type/bannerType';

import BannerForm from './BannerForm';

interface UpdateBannerProps {
  bannerId: number;
}

export default function UpdateBanner({ bannerId }: UpdateBannerProps) {
  const [form] = useForm();

  const { data, isSuccess } = useGetBanner({
    id: { bannerId },
    data: null,
  });
  const { mutate: updateBanner } = useUpdateBanner(bannerId);
  const { mutate: deleteBanner } = useDeleteBanner();

  const handleSubmit = (formValue: BannerFormValue) => {
    const { exposureDuration, image } = formValue;

    updateBanner({
      id: { bannerId },
      data: {
        ...formValue,
        exposureEndDate: exposureDuration[1],
        exposureStartDate: exposureDuration[0],
        image,
        imageName: data?.data.imageName,
        imagePath: !!image && image.length > 0 ? data?.data.imagePath : '',
      },
    });
  };

  const handleCancel = () => {
    deleteBanner({
      id: { bannerId },
      data: null,
    });
  };

  if (isSuccess) {
    const {
      createdDate,
      modifiedDate,
      exposureEndDate,
      exposureStartDate,
      imagePath,
      imageName,
    } = data.data;

    return (
      <BannerForm
        mode="update"
        form={form}
        onDelete={handleCancel}
        onSubmit={handleSubmit}
        initialValue={{
          ...data?.data,
          createdDate: dayjs(createdDate),
          modifiedDate: dayjs(modifiedDate),
          exposureStartDate: dayjs(exposureStartDate),
          exposureEndDate: dayjs(exposureEndDate),
          image: imagePath + imageName,
        }}
      />
    );
  }

  return (
    <div className={'flex min-h-16 w-full items-center justify-center'}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
}
