import { Form, FormItemProps, Select } from 'antd';
import React from 'react';

import Label from '@/share/form/item/Label';

export type Option = { id: number; value: string; label: string };

interface DropdownProps extends FormItemProps {
  label: string;
  placeholder?: string;
  name?: string;
  optionList: Option[];
}

function Dropdown({
  label,
  placeholder,
  name,
  optionList,
  ...props
}: DropdownProps) {
  return (
    <Form.Item label={label && <Label>{label}</Label>} name={name} {...props}>
      <Select allowClear placeholder={placeholder} className={'w-full'}>
        {optionList.map((option: Option) => (
          <Select.Option key={option.id} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default Dropdown;
