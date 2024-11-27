'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';

import { useGetLink } from '@/share/query/link/useGetLink';
import { useUpdateLink } from '@/share/query/link/useUpdateLink';
import { LinkFormValue } from '@/type/linkType';

import LinkForm from './LinkForm';

interface UpdateLinkProps {
  currentLinkId: number;
}

export default function UpdateLink({ currentLinkId }: UpdateLinkProps) {
  const [form] = useForm();
  const { mutate: updateLink } = useUpdateLink();

  const { data, isSuccess } = useGetLink({
    id: { linkId: currentLinkId },
    data: null,
  });

  const handleSubmit = (formValue: LinkFormValue) => {
    updateLink({
      id: { linkId: currentLinkId },
      data: {
        ...formValue,
      },
    });
  };

  const handleCancel = () => {
    form.setFieldsValue({
      ...data?.data,
      createdDate: dayjs(data?.data.createdDate),
      modifiedDate: dayjs(data?.data.modifiedDate),
      publishDate: dayjs(data?.data.publishDate),
    });
  };

  if (isSuccess) {
    const { createdDate, modifiedDate, publishDate } = data.data;

    return (
      <LinkForm
        mode="update"
        form={form}
        onDelete={handleCancel}
        onSubmit={handleSubmit}
        initialValue={{
          ...data.data,
          createdDate: dayjs(createdDate),
          modifiedDate: dayjs(modifiedDate),
          publishDate: dayjs(publishDate),
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
