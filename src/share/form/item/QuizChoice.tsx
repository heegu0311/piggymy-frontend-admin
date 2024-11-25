'use client';

import { Form, FormItemProps, Select } from 'antd';

import Label from '@/share/form/item/Label';
import { useGetQuizList } from '@/share/query/quiz/useGetQuizList';
import StatusBadge from '@/share/ui/badge/StatusBadge';
import filterOption from '@/utils/filterOption';

interface QuizChoiceProps extends FormItemProps {
  mode?: 'single' | 'multiple';
}

export default function QuizChoice({
  name,
  initialValue,
  mode = 'single',
}: QuizChoiceProps) {
  const { data, isLoading } = useGetQuizList({
    data: { page: 1, page_size: 1000 },
  });

  return (
    <Form.Item
      label={<Label>{'퀴즈 선택'}</Label>}
      name={name}
      initialValue={initialValue}
      rules={[
        {
          required: true,
          message: `퀴즈 카드를 선택해 주세요`,
        },
      ]}
    >
      <Select
        showSearch
        filterOption={filterOption}
        placeholder="퀴즈카드를 선택해주세요."
        loading={isLoading}
        mode={mode === 'multiple' ? 'multiple' : undefined}
      >
        {data?.data &&
          data?.data.list
            .filter((quiz) => {
              if (status === 'active') return quiz.isUse === true;
              if (status === 'inActive') return quiz.isUse === false;
              return true;
            })
            .map((quiz) => (
              <Select.Option value={quiz.id} key={quiz.id}>
                <StatusBadge isActive={quiz.isUse} className="mr-3" />
                {quiz.title}
              </Select.Option>
            ))}
      </Select>
    </Form.Item>
  );
}
