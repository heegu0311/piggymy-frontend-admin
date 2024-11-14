'use client';

import { DatePicker, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import Label from '@/share/form/item/Label';
import { useCreateGreeting } from '@/share/query/greeting/useCreateGreeting';
import { useGetGreeting } from '@/share/query/greeting/useGetGreeting';
import Button from '@/share/ui/button/Button';
import ContentBox from '@/share/ui/content-box/ContentBox';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface GreetingMessageFormValue {
  exposureDuration: [string, string];
  message: string;
}

export default function GreetingMessageForm() {
  const [form] = useForm();
  const { data: createData, mutate } = useCreateGreeting({
    onSuccess: () => form.resetFields(),
  });

  const { data } = useGetGreeting();

  const handleFinish = async (formValue: GreetingMessageFormValue) => {
    mutate({
      data: {
        message: formValue.message,
        exposureDuration: formValue.exposureDuration,
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      exposureDuration: data?.data.exposureDuration.map((d) => {
        return dayjs(d.substring(0, 10));
      }),
      message: data?.data.message,
    });
  }, [data]);

  useEffect(() => {
    form.setFieldsValue({
      exposureDuration: createData?.exposureDuration.map((d) => {
        return dayjs(d.substring(0, 10)).add(1, 'd');
      }),
      message: createData?.message,
    });
  }, [createData]);

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
