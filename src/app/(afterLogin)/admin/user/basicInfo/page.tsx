import { Suspense } from 'react';

import PageInfo from '@/app/(afterLogin)/admin/_components/PageInfo';
import CardFilter from '@/app/(afterLogin)/admin/quiz/_components/CardFilter';
import SegmentControlContainer from '@/app/(afterLogin)/admin/user/basicInfo/_components/SegmentControlContainer';
import UserSearchList from '@/app/(afterLogin)/admin/user/basicInfo/_components/UserSearchList';
import Layout from '@/share/layout/Layout';

export default async function UserManagement() {
  return (
    <>
      <Layout.Content.Full>
        <PageInfo title={'기본 정보 관리'} path={['회원', '기본 정보 관리']} />
      </Layout.Content.Full>
      <Layout.Content.Full>
        <Suspense>
          <CardFilter />
        </Suspense>
      </Layout.Content.Full>

      <Layout.Content.Left>
        <Suspense>
          <UserSearchList />
        </Suspense>
      </Layout.Content.Left>
      <Layout.Content.Right>
        <SegmentControlContainer />
      </Layout.Content.Right>
    </>
  );
}
