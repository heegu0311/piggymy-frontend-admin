import { Suspense } from 'react';

import CardFilter from '@/app/(afterLogin)/admin/quiz/_components/CardFilter';
import UpdateVoca from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/UpdateVoca';
import VocaSearchList from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/VocaSearchList';
import Layout from '@/share/layout/Layout';

import PageInfo from '../../../_components/PageInfo';

export default async function VocaUpdate({
  params,
  searchParams,
}: {
  params: { vocaId: number };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <>
      <Layout.Content.Full>
        <PageInfo
          title={'용어카드 관리'}
          path={['용어 퀴즈', '용어카드 관리']}
        />
      </Layout.Content.Full>
      <Layout.Content.Full>
        <Suspense>
          <CardFilter />
        </Suspense>
      </Layout.Content.Full>
      <Layout.Content.Left>
        <VocaSearchList searchParams={searchParams} />
      </Layout.Content.Left>
      <Layout.Content.Right>
        <UpdateVoca vocaId={params.vocaId} />
      </Layout.Content.Right>
    </>
  );
}
