'use client';

import { Form, FormItemProps, Radio, Select } from 'antd';
import { useState } from 'react';

import Label from '@/share/form/item/Label';
import { useGetVocaList } from '@/share/query/voca/useGetVocaList';
import StatusBadge from '@/share/ui/badge/StatusBadge';
import filterOption from '@/utils/filterOption';

interface VocaChoiceProps extends FormItemProps {
  mode?: 'single' | 'multiple';
}

export default function VocaChoice({
  name,
  initialValue,
  mode = 'single',
}: VocaChoiceProps) {
  const { data, isLoading } = useGetVocaList({
    data: { page: 1, page_size: 1000 },
  });
  const [status, setStatus] = useState<'all' | 'active' | 'inActive'>('all');
  return (
    <>
      <Form.Item label={<Label>{'용어 옵션'}</Label>}>
        <Radio.Group
          options={[
            { label: '전체', value: 'all' },
            { label: '사용중', value: 'active' },
            { label: '미사용', value: 'inActive' },
          ]}
          defaultValue="all"
          onChange={(e) => setStatus(e.target.value)}
          optionType="button"
          buttonStyle="solid"
          className="mr-5"
        />
      </Form.Item>

      <Form.Item
        label={<Label>{'용어 선택'}</Label>}
        name={name}
        initialValue={initialValue}
        rules={[
          {
            required: true,
            message: `용어 카드를 선택해 주세요`,
          },
        ]}
      >
        <Select
          showSearch
          filterOption={filterOption}
          placeholder="용어카드를 선택해주세요."
          loading={isLoading}
          mode={mode === 'multiple' ? 'multiple' : undefined}
        >
          {data?.data &&
            data?.data.list
              .filter((voca) => {
                if (status === 'active') return voca.isUse;
                if (status === 'inActive') return !voca.isUse;
                return true;
              })
              .map((voca) => (
                <Select.Option value={voca.id} key={voca.id}>
                  <StatusBadge isActive={voca.isUse} className="mr-3" />
                  {`${voca.koreanTitle}(${voca.englishTitle})`}
                </Select.Option>
              ))}
        </Select>
      </Form.Item>
    </>
  );
}
