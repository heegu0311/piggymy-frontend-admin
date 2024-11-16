'use client';

import { DatePicker, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';

import Label from '@/share/form/item/Label';
import { useUpdateGreeting } from '@/share/query/greeting/useCreateGreeting';
import { useGetGreeting } from '@/share/query/greeting/useGetGreeting';
import Button from '@/share/ui/button/Button';
import ContentBox from '@/share/ui/content-box/ContentBox';

dayjs.extend(utc);
dayjs.extend(timezone);

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface GreetingMessageFormValue {
  id: string;
  exposureDuration: [string, string];
  message: string;
}

export default function GreetingMessageForm() {
  const [form] = useForm();

  const { data } = useGetGreeting();

  const { mutate } = useUpdateGreeting({
    onSuccess: (data) => {
      form.setFieldsValue({
        ...data,
        exposureDuration: data.exposureDuration.map((d) => convertTimezone(d)),
      });
    },
  });

  const convertTimezone = (date: string) => {
    return dayjs.utc(date).tz('Asia/Seoul');
  };

  const handleFinish = async (formValue: GreetingMessageFormValue) => {
    mutate({
      data: {
        id: data!.data.id,
        message: formValue.message,
        exposureDuration: formValue.exposureDuration,
      },
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data?.data.id,
        exposureDuration: data?.data.exposureDuration.map((d) =>
          convertTimezone(d),
        ),
        message: data?.data.message,
      });
    }
  }, [data, form]);

  return (
    <ContentBox className={'flex h-full items-start'}>
      <Form
        labelCol={{ span: 2 }}
        layout="horizontal"
        className="mr-4 h-full w-full overflow-y-auto"
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item
          label={<Label>노출 기간</Label>}
          name="exposureDuration"
          rules={[
            {
              required: true,
              message: '노출 기간을 입력해주세요.',
            },
          ]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          label={<Label>메시지</Label>}
          name="message"
          rules={[
            {
              required: true,
              message: '메시지를 입력해주세요.',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item className="flex w-full justify-center">
          <Button type="submit" size="large" className="mx-4">
            저장
          </Button>
        </Form.Item>
      </Form>
    </ContentBox>
  );
}
