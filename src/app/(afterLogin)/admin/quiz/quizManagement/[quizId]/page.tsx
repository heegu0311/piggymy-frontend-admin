import { Suspense } from 'react';

import CardFilter from '@/app/(afterLogin)/admin/quiz/_components/CardFilter';
import QuizSearchList from '@/app/(afterLogin)/admin/quiz/quizManagement/_components/QuizSearchList';
import Layout from '@/share/layout/Layout';

import PageInfo from '../../../_components/PageInfo';
import UpdateQuiz from '../_components/UpdateQuiz';

export default async function QuizUpdate({
  params,
  searchParams,
}: {
  params: { quizId: number };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <>
      <Layout.Content.Full>
        <PageInfo
          title={'퀴즈카드 관리'}
          path={['용어 퀴즈', '퀴즈카드 관리']}
        />
      </Layout.Content.Full>
      <Layout.Content.Full>
        <Suspense>
          <CardFilter />
        </Suspense>
      </Layout.Content.Full>

      <Layout.Content.Left>
        <QuizSearchList searchParams={searchParams} />
      </Layout.Content.Left>
      <Layout.Content.Right>
        <UpdateQuiz quizId={params.quizId} />
      </Layout.Content.Right>
    </>
  );
}
