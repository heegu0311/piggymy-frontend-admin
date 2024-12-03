import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import React from 'react';

import { ActiveCheckbox } from '@/share/form/item/ActiveCheckbox';
import ImageUpload from '@/share/form/item/ImageUpload';
import Label from '@/share/form/item/Label';
import QuizSelect from '@/share/form/item/QuizSelect';
import Button from '@/share/ui/button/Button';
import ContentBox from '@/share/ui/content-box/ContentBox';
import { UpdateVocaRequestJson, VocaFormValue } from '@/type/vocaType';

interface VocaFormProps {
  initialValues: UpdateVocaRequestJson;
  form: FormInstance;
  onFinish: (formValue: VocaFormValue) => void;
  onCancel: () => void;
}

function VocaForm({ initialValues, form, onCancel, onFinish }: VocaFormProps) {
  return (
    <ContentBox className={'flex h-full items-start'}>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        layout="horizontal"
        className="h-full w-full overflow-y-auto"
        onFinish={onFinish}
      >
        <Form.Item label={<Label>등록일</Label>} name={'createdDate'}>
          <div className={'flex w-full items-start justify-between'}>
            <i className={'flex h-8 items-center'}>
              {initialValues?.createdDate
                ? dayjs(initialValues?.createdDate).format('YYYY-MM-DD')
                : dayjs().format('YYYY-MM-DD')}
            </i>
            <ActiveCheckbox />
          </div>
        </Form.Item>
        <Form.Item
          label={<Label>용어</Label>}
          name="koreanTitle"
          rules={[
            {
              required: true,
              message: '내용을 입력해주세요.',
            },
          ]}
          className={'w-full'}
        >
          <Input placeholder="내용을 입력해주세요." />
        </Form.Item>
        <ImageUpload initialImage={initialValues?.image} maxCount={1} />
        <Form.Item
          label={<Label>대표이미지 출처</Label>}
          name="imageName"
          className={'w-full'}
        >
          <Input placeholder="내용을 입력해주세요." />
        </Form.Item>
        <Form.Item label={<Label>뜻</Label>} name="content">
          <TextArea rows={8} />
        </Form.Item>
        <Form.Item
          label={<Label>뜻 출처</Label>}
          name="sourceName"
          className={'w-full'}
        >
          <Input placeholder="내용을 입력해주세요." />
        </Form.Item>
        <Form.Item
          label={<Label>관련 링크</Label>}
          name="sourceLink"
          className={'w-full'}
        >
          <Input placeholder="내용을 입력해주세요." />
        </Form.Item>
        {/*
        <Form.Item
          label={<Label>{''}</Label>}
          colon={false}
          name={`reference${2}`}
          className={'w-full'}
        >
          <div className={'flex w-full items-start justify-between gap-4'}>
            <Input placeholder="내용을 입력해주세요." />
            <IconButton type={'button'}>
              <div className={'flex items-center justify-center gap-1'}>
                <Image src={plus} alt="링크 추가" width={14} height={14} />
              </div>
            </IconButton>
          </div>
        </Form.Item>
        */}
        <QuizSelect name="quizId" initialValue={initialValues?.quizId} />
        <Form.Item className="flex w-full justify-center">
          <Button
            type="button"
            size="large"
            color="gray"
            className="mx-4"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button type="submit" size="large" className="mx-4">
            저장
          </Button>
        </Form.Item>
      </Form>
    </ContentBox>
  );
}

export default VocaForm;
