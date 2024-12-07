'use client';

import { Form, FormItemProps, Select } from 'antd';
import React from 'react';

import Label from '@/share/form/item/Label';
import { useGetQuizList } from '@/share/query/quiz/useGetQuizList';
import StatusBadge from '@/share/ui/badge/StatusBadge';
import filterOption from '@/utils/filterOption';

interface QuizSelectProps extends FormItemProps {}

export default function QuizSelect({ name, initialValue }: QuizSelectProps) {
  const { data, isLoading } = useGetQuizList({
    data: { page: 1, page_size: 1000 },
  });

  return (
    <Form.Item
      label={<Label>{'관련 퀴즈카드'}</Label>}
      name={name}
      initialValue={initialValue}
    >
      <Select
        showSearch
        filterOption={filterOption}
        placeholder="퀴즈카드를 선택해주세요."
        loading={isLoading}
        allowClear
      >
        {data?.data &&
          data?.data.list.map((quiz) => (
            <Select.Option value={quiz.id} key={quiz.id}>
              <StatusBadge isActive={quiz.isUse} className="mr-3" />
              {`${quiz.title}`}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
}
