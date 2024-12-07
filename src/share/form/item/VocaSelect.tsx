'use client';

import { Form, FormItemProps, Select } from 'antd';
import React from 'react';

import Label from '@/share/form/item/Label';
import { useGetVocaList } from '@/share/query/voca/useGetVocaList';
import StatusBadge from '@/share/ui/badge/StatusBadge';
import filterOption from '@/utils/filterOption';

interface VocaSelectProps extends FormItemProps {}

export default function VocaSelect({ name, initialValue }: VocaSelectProps) {
  const { data, isLoading } = useGetVocaList({
    data: { page: 1, page_size: 1000 },
  });

  return (
    <Form.Item
      label={<Label>{'관련 용어카드'}</Label>}
      name={name}
      initialValue={initialValue}
    >
      <Select
        showSearch
        filterOption={filterOption}
        placeholder="용어카드를 선택해주세요."
        loading={isLoading}
        allowClear
      >
        {data?.data &&
          data?.data.list.map((voca) => (
            <Select.Option value={voca.id} key={voca.id}>
              <StatusBadge isActive={voca.isUse} className="mr-3" />
              {`${voca.koreanTitle}(${voca.englishTitle})`}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
}
