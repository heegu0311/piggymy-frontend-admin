'use client';

import { Form, Pagination } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';

import Text from '@/share/form/item/Text';
import { useDeleteUsers } from '@/share/query/user/useDeleteUsers';
import { useGetUserList } from '@/share/query/user/useGetUserList';
import Button from '@/share/ui/button/Button';
import IconButton from '@/share/ui/button/IconButton';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Dropdown from '@/share/ui/dropdown/Dropdown';
import Icon from '@/share/ui/icon/Icon';
import Card from '@/share/ui/list-item/Card';
import Title from '@/share/ui/title/Title';
import { buildQueryString } from '@/share/utils/query';
import { UserModel } from '@/type/userType';

interface FormExampleValue {
  range: Dayjs[];
  useYn: boolean;
  keyword: string;
}

function UserSearchList() {
  const params = useParams();
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  const isUse = searchParams.get('is_use');
  const keyword = searchParams.get('keyword');

  const [selectUserList, setSelectUserList] = useState<UserModel[]>([]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState<'CREATED' | 'MODIFIED'>('CREATED');

  const selectUserIds = selectUserList.map((user) => user.id);

  const { data, refetch } = useGetUserList({
    data: {
      page,
      page_size: 10,
      start_date: startDate!,
      end_date: endDate!,
      is_use: isUse,
      search_keyword: keyword!,
      sort_type: sortType,
    },
  });
  const { mutate: deleteUsers } = useDeleteUsers();

  const totalCount = data?.data.totalCount;
  const userList = data?.data.list ?? [];

  const handleFinish = (formValue: FormExampleValue) => {
    const params = {
      start_date: startDate ?? '',
      end_date: endDate ?? '',
      is_use: isUse ?? '',
      keyword: formValue.keyword ?? '',
    };

    if (buildQueryString(params)) {
      router.replace(`${path}?${buildQueryString(params)}`);
    } else {
      router.replace(`${path}`);
    }
  };

  const handleDeleteUsers = () => {
    deleteUsers({ data: { userIds: selectUserIds } });
    setSelectUserList([]);
  };

  const toggleCheck = (user: UserModel) => {
    const ids = new Set(selectUserIds);
    if (ids.has(+user.id)) {
      setSelectUserList((prev) => prev.filter((item) => item.id !== user.id));
    } else {
      setSelectUserList((prev) => [...prev, user]);
    }
  };

  useEffect(() => {
    refetch().then();
  }, [sortType, page, refetch]);

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
            <Icon icon={'search'} size={18} />
          </IconButton>
        </div>
        <div className={'flex w-full items-start justify-between'}>
          <Title>
            전체 회원 <Title.H>{totalCount}</Title.H>명
          </Title>
          <Dropdown
            options={[
              { inputVal: 'CREATED', summary: '등록일' },
              { inputVal: 'MODIFIED', summary: '업데이트순' },
            ]}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSortType(e.target.value as 'CREATED' | 'MODIFIED');
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            size="small"
            color="blue"
            onClick={handleDeleteUsers}
          >
            탈퇴 처리
          </Button>
        </div>
        <div className={'relative h-full'}>
          <ul
            id={'list'}
            className={
              'flex min-h-[calc(94px*10)] flex-col gap-4 overflow-y-auto pb-20'
            }
          >
            {userList?.map((user: UserModel) => {
              return (
                <li key={user.id} className={'list-none'}>
                  <Card
                    id={user.id.toString()}
                    koreanTitle={user.nickname}
                    createdDate={dayjs(user.createdDate).format('YYYY-MM-DD')}
                    isActive={!user.delYn}
                    isChecked={selectUserList
                      .map((user) => user.id)
                      .includes(user.id)}
                    route={`/admin/user/basicInfo/${user.id}`}
                    isSelected={+params.userId === user.id}
                    onChangeChecked={() => toggleCheck(user)}
                    labels={['활동중', '탈퇴']}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={'flex w-full items-center justify-center'}>
          <Pagination
            current={page}
            showLessItems
            showSizeChanger={false}
            total={totalCount}
            onChange={async (page) => {
              setPage(page);
              await refetch();
            }}
          />
        </div>
      </Form>
    </ContentBox>
  );
}

export default UserSearchList;
