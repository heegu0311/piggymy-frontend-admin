'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';

import { useDeleteBadge } from '@/share/query/badge/useDeleteBadge';
import { useGetBadge } from '@/share/query/badge/useGetBadge';
import { useUpdateBadge } from '@/share/query/badge/useUpdateBadge';
import { BadgeFormValue } from '@/type/badgeType';

import BadgeForm from './BadgeForm';

interface UpdateBadgeProps {
  currentBadgeId: number;
}

export default function UpdateBadge({ currentBadgeId }: UpdateBadgeProps) {
  const [form] = useForm();
  const { mutate: updateBadge } = useUpdateBadge();
  const { mutate: deleteBadge } = useDeleteBadge();

  const { data, isSuccess } = useGetBadge({
    id: { badgeId: currentBadgeId },
    data: null,
  });

  const handleSubmit = (formValue: BadgeFormValue) => {
    const { thumbnail } = formValue;

    if (
      thumbnail &&
      thumbnail.length > 0 &&
      thumbnail[0].url ===
        String(data?.data.thumbnailPath) + String(data?.data.thumbnailName)
    ) {
      updateBadge({
        id: { badgeId: currentBadgeId },
        data: {
          ...formValue,
          thumbnail: [],
          thumbnailName: String(data?.data.thumbnailName),
          thumbnailPath: String(data?.data.thumbnailPath),
        },
      });
    } else {
      updateBadge({
        id: { badgeId: currentBadgeId },
        data: {
          ...formValue,
          thumbnailName: '',
          thumbnailPath: '',
        },
      });
    }
  };

  const handleCancel = () => {
    deleteBadge({
      id: { badgeId: currentBadgeId },
      data: null,
    });
  };

  if (isSuccess) {
    const { createdDate, modifiedDate, thumbnailName, thumbnailPath } =
      data.data;

    return (
      <BadgeForm
        mode="update"
        form={form}
        onDelete={handleCancel}
        onSubmit={handleSubmit}
        initialValue={{
          ...data.data,
          createdDate: dayjs(createdDate),
          modifiedDate: dayjs(modifiedDate),
          thumbnail: thumbnailPath + thumbnailName,
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
