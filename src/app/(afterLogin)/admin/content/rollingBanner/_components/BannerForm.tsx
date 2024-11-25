'use client';

import { DatePicker, Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { ActiveCheckbox } from '@/share/form/item/ActiveCheckbox';
import CreatedDate from '@/share/form/item/CreatedDate';
import ImageUpload from '@/share/form/item/ImageUpload';
import Label from '@/share/form/item/Label';
import QuizChoice from '@/share/form/item/QuizChoice';
import VocaChoice from '@/share/form/item/VocaChoice';
import Button from '@/share/ui/button/Button';
import ContentBox from '@/share/ui/content-box/ContentBox';
import { BannerFormValue } from '@/type/bannerType';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface BannerFormProps {
  onSubmit: (data: BannerFormValue) => void;
  onDelete: () => void;
  form: FormInstance;
  mode: 'create' | 'update';
  initialValue?: {
    createdDate: Dayjs;
    modifiedDate: Dayjs;
    exposureStartDate: Dayjs;
    exposureEndDate: Dayjs;
    type: 'VOCA' | 'QUIZ';
    title: string;
    image: string;
    buttonName: string;
    moveQuizId: number | null;
    moveVocaId: number | null;
    isUse: boolean;
  };
}

export default function BannerForm({
  initialValue,
  onSubmit,
  onDelete,
  form,
  mode,
}: BannerFormProps) {
  const [type, setType] = useState<'VOCA' | 'QUIZ'>(
    initialValue ? initialValue.type : 'VOCA',
  );

  const handleTypeChange = (value: 'VOCA' | 'QUIZ') => {
    setType(value);
  };

  useEffect(() => {
    initialValue && setType(initialValue.type);
  }, [initialValue]);

  return (
    <ContentBox className={'flex h-full items-start'}>
      <Form
        labelCol={{ span: 2 }}
        layout="horizontal"
        className="mr-4 h-full w-full overflow-y-auto"
        onFinish={onSubmit}
        form={form}
      >
        <CreatedDate
          createdDate={initialValue ? initialValue.createdDate : dayjs()}
        />
        <ActiveCheckbox initialValue={initialValue?.isUse} />
        <Form.Item
          label={<Label>노출 기간</Label>}
          name="exposureDuration"
          rules={[
            {
              required: true,
              message: '노출 기간을 입력해주세요.',
            },
          ]}
          initialValue={
            initialValue
              ? [
                  dayjs(initialValue?.exposureStartDate),
                  dayjs(initialValue?.exposureEndDate),
                ]
              : null
          }
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          label={<Label>구분</Label>}
          name="type"
          rules={[
            {
              required: true,
              message: '내용을 입력해주세요.',
            },
            {
              max: 10,
              message: '최대 10글자 입니다.',
            },
          ]}
          initialValue={type}
        >
          <Select onChange={handleTypeChange}>
            <Select.Option value="VOCA">용어</Select.Option>
            <Select.Option value="QUIZ">퀴즈</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<Label>타이틀</Label>}
          name="title"
          rules={[
            {
              required: true,
              message: '메시지를 입력해주세요.',
            },
          ]}
          initialValue={initialValue?.title}
        >
          <TextArea rows={4} />
        </Form.Item>
        <ImageUpload initialImage={initialValue?.image} maxCount={1} />
        <Form.Item
          label={<Label>버튼명</Label>}
          name="buttonName"
          rules={[
            {
              required: true,
              message: '내용을 입력해주세요.',
            },
          ]}
          initialValue={initialValue?.buttonName}
        >
          <Input placeholder="내용을 입력해주세요." />
        </Form.Item>
        {type === 'VOCA' ? (
          <VocaChoice
            name="moveVocaId"
            initialValue={initialValue?.moveVocaId}
          />
        ) : (
          <QuizChoice
            name="moveQuizId"
            initialValue={initialValue?.moveQuizId}
          />
        )}

        <Form.Item className="flex w-full justify-center">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            size="large"
            className="mx-4"
            color="gray"
          >
            {mode === 'create' ? '취소' : '삭제'}
          </Button>
          <Button type="submit" size="large" className="mx-4">
            {mode === 'create' ? '저장' : '수정'}
          </Button>
        </Form.Item>
      </Form>
    </ContentBox>
  );
}
