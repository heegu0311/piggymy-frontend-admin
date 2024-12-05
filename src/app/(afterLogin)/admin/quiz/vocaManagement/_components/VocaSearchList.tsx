'use client';

import { Form, Pagination } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { MouseEventHandler, useEffect, useState } from 'react';

import Text from '@/share/form/item/Text';
import NoticeModal from '@/share/modal/NoticeModal';
import { useModal } from '@/share/modal/useModal';
import { useDeleteVocas } from '@/share/query/voca/useDeleteVocas';
import { useGetVocaList } from '@/share/query/voca/useGetVocaList';
import { usePatchVocasIsUse } from '@/share/query/voca/useUpdateVoca';
import Button from '@/share/ui/button/Button';
import IconButton from '@/share/ui/button/IconButton';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Icon from '@/share/ui/icon/Icon';
import Add from '@/share/ui/list-item/Add';
import Card from '@/share/ui/list-item/Card';
import Title from '@/share/ui/title/Title';
import { buildQueryString } from '@/share/utils/query';
import { VocaModel } from '@/type/vocaType';

interface FormExampleValue {
  range: Dayjs[];
  useYn: boolean;
  keyword: string;
}

interface VocaSearchListProps {
  searchParams: {
    start_date?: string;
    end_date?: string;
    is_use?: string;
    search_keyword?: string;
  };
}

function VocaSearchList({ searchParams }: VocaSearchListProps) {
  const { vocaId } = useParams();
  const router = useRouter();
  const path = usePathname();
  const { openModal, closeModal } = useModal();

  const [selectVocaList, setSelectVocaList] = useState<VocaModel[]>([]);
  const [page, setPage] = useState(1);
  // const [sortType, setSortType] = useState<'CREATED' | 'MODIFIED'>('CREATED');

  const selectVocaIds = selectVocaList.map((voca) => voca.id);
  const selectVocaIsUseValues = selectVocaList.map((voca) => voca.isUse);

  const { data, refetch } = useGetVocaList({
    data: {
      page,
      page_size: 10,
      // sort_type: sortType,
      ...searchParams,
    },
  });
  const { mutate: deleteVocas } = useDeleteVocas();
  const { mutate: patchVocas } = usePatchVocasIsUse();

  const totalCount = data?.data.totalCount;
  const vocaList = data?.data.list ?? [];

  useEffect(() => {
    refetch().then();
  }, [page, refetch]);

  const handleFinish = (formValue: FormExampleValue) => {
    const params = {
      ...searchParams,
      search_keyword: formValue.keyword ?? '',
    };

    if (buildQueryString(params)) {
      router.replace(`${path}?${buildQueryString(params)}`);
    } else {
      router.replace(`${path}`);
    }
  };

  const handleIsUseChange: MouseEventHandler = (e) => {
    e.preventDefault();
    const isAllTrue = selectVocaIsUseValues.every((value) => value);
    const isAllFalse = selectVocaIsUseValues.every((value) => !value);

    if (isAllTrue || isAllFalse) {
      openModal(
        'isUseChange',
        <NoticeModal
          message={`체크된 항목 ${selectVocaList.length}건이 있습니다.\n모두 ‘${isAllTrue ? '미사용' : '사용'}'으로 변경하시겠습니까??`}
          onConfirm={() => {
            patchVocas({
              data: {
                vocaIds: selectVocaIds,
                attr: 'isUse',
                value: !isAllTrue,
              },
            });
            setSelectVocaList([]);
            closeModal('isUseChange');
          }}
          onCancel={() => {
            closeModal('isUseChange');
          }}
        />,
        { clickableOverlay: false },
      );
    } else {
      openModal(
        'isUseChange',
        <NoticeModal
          type={'question'}
          message={'사용여부가 같은 항목들끼리만 체크해주세요.'}
          onConfirm={() => {
            closeModal('isUseChange');
          }}
        />,
        { clickableOverlay: true },
      );
    }
  };

  const handleDeleteVocas = () => {
    deleteVocas({ data: { vocaIds: selectVocaIds } });
    setSelectVocaList([]);
  };

  const toggleCheck = (voca: VocaModel) => {
    const ids = new Set(selectVocaIds);
    if (ids.has(+voca.id)) {
      setSelectVocaList((prev) => prev.filter((item) => item.id !== voca.id));
    } else {
      setSelectVocaList((prev) => [...prev, voca]);
    }
  };

  return (
    <ContentBox className={'flex h-full items-start'}>
      <Form
        className={'flex h-full w-full flex-col gap-4'}
        onFinish={handleFinish}
      >
        <div className={'flex w-full items-start justify-between gap-x-3'}>
          <Text
            label={''}
            placeholder={'검색'}
            name={'keyword'}
            className={'w-full'}
          />
          <IconButton type={'submit'}>
            <Icon icon={'search'} size={16} />
          </IconButton>
        </div>
        <div className={'flex w-full items-start justify-between'}>
          <Title>
            전체 용어 <Title.H>{totalCount}</Title.H>건
          </Title>
          {/*
            <Dropdown
              options={[
                { inputVal: 'CREATED', summary: '등록일' },
                { inputVal: 'MODIFIED', summary: '업데이트순' },
              ]}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setSortType(e.target.value as 'CREATED' | 'MODIFIED');
              }}
            />
          */}
        </div>
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            size="small"
            color="blue"
            onClick={handleIsUseChange}
            disabled={selectVocaIds.length < 1}
          >
            사용여부 일괄변경
          </Button>
          <Button
            type="button"
            size="small"
            color="blue"
            onClick={handleDeleteVocas}
          >
            삭제
          </Button>
        </div>
        <div className={'relative h-full'}>
          <ul
            id={'list'}
            className={
              'flex min-h-[calc(94px*11)] flex-col gap-4 overflow-y-auto pb-20'
            }
          >
            {vocaList?.map((voca: VocaModel) => {
              return (
                <li key={voca.id} className={'list-none'}>
                  <Card
                    id={voca.id.toString()}
                    koreanTitle={voca.koreanTitle}
                    createdDate={dayjs(voca.createdDate).format('YYYY-MM-DD')}
                    isActive={voca.isUse}
                    isChecked={selectVocaList
                      .map((voca) => voca.id)
                      .includes(voca.id)}
                    route={`/admin/quiz/vocaManagement/${voca.id}`}
                    isSelected={+vocaId === voca.id}
                    onChangeChecked={() => toggleCheck(voca)}
                  />
                </li>
              );
            })}
          </ul>
          <div className={'absolute bottom-0'}>
            <Add
              type={'card'}
              isSelected={false}
              route={'/admin/quiz/vocaManagement'}
            />
          </div>
        </div>
        <div className={'flex w-full items-center justify-center'}>
          <Pagination
            current={page}
            showLessItems
            showSizeChanger={false}
            total={totalCount}
            onChange={async (page) => {
              setPage(page);
            }}
          />
        </div>
      </Form>
    </ContentBox>
  );
}

export default VocaSearchList;
