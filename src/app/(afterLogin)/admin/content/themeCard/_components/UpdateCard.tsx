'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';

import { useDeleteCard } from '@/share/query/card/useDeleteCard';
import { useGetCard } from '@/share/query/card/useGetCard';
import { useUpdateCard } from '@/share/query/card/useUpdateCard';
import { CardFormValue } from '@/type/cardType';

import CardForm from './CardForm';

interface UpdateCardProps {
  currentCardId: number;
}

export default function UpdateCard({ currentCardId }: UpdateCardProps) {
  const [form] = useForm();
  const { mutate: updateCard } = useUpdateCard();
  const { mutate: deleteCard } = useDeleteCard();

  const { data, isSuccess } = useGetCard({
    id: { cardId: currentCardId },
    data: null,
  });

  const handleSubmit = (formValue: CardFormValue) => {
    updateCard({
      id: { cardId: currentCardId },
      data: {
        ...formValue,
        exposureEndDate: formValue.exposureDuration[1],
        exposureStartDate: formValue.exposureDuration[0],
      },
    });
  };

  const handleCancel = () => {
    deleteCard({
      id: { cardId: currentCardId },
      data: null,
    });
  };

  if (isSuccess) {
    const { createdDate, modifiedDate, exposureEndDate, exposureStartDate } =
      data.data;

    return (
      <CardForm
        mode="update"
        form={form}
        onDelete={handleCancel}
        onSubmit={handleSubmit}
        initialValue={{
          ...data.data,
          createdDate: dayjs(createdDate),
          modifiedDate: dayjs(modifiedDate),
          exposureStartDate: dayjs(exposureStartDate),
          exposureEndDate: dayjs(exposureEndDate),
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
