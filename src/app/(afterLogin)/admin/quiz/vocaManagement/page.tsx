import { Suspense } from 'react';

import CardFilter from '@/app/(afterLogin)/admin/quiz/_components/CardFilter';
import CreateVoca from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/CreateVoca';
import VocaSearchList from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/VocaSearchList';
import Layout from '@/share/layout/Layout';

import PageInfo from '../../_components/PageInfo';

export default async function VocaManagement({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const params = {
    start_date: searchParams['start_date'],
    end_date: searchParams['end_date'],
    is_use: searchParams['is_use'],
    search_keyword: searchParams['search_keyword'],
  };

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
        <VocaSearchList searchParams={params} />
      </Layout.Content.Left>
      <Layout.Content.Right>
        <CreateVoca />
      </Layout.Content.Right>
    </>
  );
}
