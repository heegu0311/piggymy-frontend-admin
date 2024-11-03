'use client';

import { Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Dropdown from '@/share/form/item/Dropdown';
import RangePicker from '@/share/form/item/RangePicker';
import IconButton from '@/share/ui/button/IconButton';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Icon from '@/share/ui/icon/Icon';
import { buildQueryString } from '@/share/utils/query';

interface FormExampleValue {
  range: (Dayjs | null)[];
  useYn: boolean;
}

function CardFilter() {
  const searchParams = useSearchParams();
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  const useYn = searchParams.get('is_use');
  const router = useRouter();
  const path = usePathname();

  const handleFinish = (formValue: FormExampleValue) => {
    const isRangeSelected = !formValue.range.includes(null);
    const params = {
      start_date: isRangeSelected
        ? formValue.range[0]!.format('YYYY-MM-DD')
        : '',
      end_date: isRangeSelected ? formValue.range[1]!.format('YYYY-MM-DD') : '',
      is_use: formValue.useYn,
    };

    if (buildQueryString(params)) {
      router.replace(`${path}?${buildQueryString(params)}`);
    } else {
      router.replace(path);
    }
  };

  return (
    <ContentBox>
      <Form className={'mb-[-24px] w-full'} onFinish={handleFinish}>
        <div className={'flex w-full items-start justify-between gap-x-10'}>
          <div className={'flex gap-x-10'}>
            <RangePicker
              label={'등록일자'}
              className={'w-[379px]'}
              name={'range'}
              initialValue={[
                startDate ? dayjs(startDate) : null,
                endDate ? dayjs(endDate) : null,
              ]}
            />
            <Dropdown
              label={'사용여부'}
              placeholder={'전체'}
              className="max-w-[250px]"
              name={'useYn'}
              optionList={[
                { id: 0, value: String(true), label: '사용중' },
                { id: 1, value: String(false), label: '미사용중' },
              ]}
              initialValue={useYn}
            />
          </div>
          <IconButton type={'submit'}>
            <Icon icon={'search'} size={16} />
          </IconButton>
        </div>
      </Form>
    </ContentBox>
  );
}

export default CardFilter;
