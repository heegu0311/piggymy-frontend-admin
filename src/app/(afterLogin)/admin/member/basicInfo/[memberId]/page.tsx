import { Suspense } from 'react';

import PageInfo from '@/app/(afterLogin)/admin/_components/PageInfo';
import MemberSearchList from '@/app/(afterLogin)/admin/member/basicInfo/_components/MemberSearchList';
import UpdateMember from '@/app/(afterLogin)/admin/member/basicInfo/_components/UpdateMember';
import CardFilter from '@/app/(afterLogin)/admin/quiz/_components/CardFilter';
import Layout from '@/share/layout/Layout';

export default async function MemberManagement() {
  return (
    <>
      <Layout.Content.Full>
        <PageInfo
          title={'관리자 정보 관리'}
          path={['관리자', '관리자 정보 관리']}
        />
      </Layout.Content.Full>
      <Layout.Content.Full>
        <Suspense>
          <CardFilter />
        </Suspense>
      </Layout.Content.Full>

      <Layout.Content.Left>
        <MemberSearchList />
      </Layout.Content.Left>
      <Layout.Content.Right>
        <UpdateMember />
      </Layout.Content.Right>
    </>
  );
}
