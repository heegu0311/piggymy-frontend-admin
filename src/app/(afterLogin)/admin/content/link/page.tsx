import { Suspense } from 'react';

import Layout from '@/share/layout/Layout';

import LinkList from './_components/LinkList';
import LinkPageInfo from './_components/LinkPageInfo';
import LinkSearchForm from './_components/LinkSearchForm';

export default async function Link() {
  return (
    <>
      <Layout.Content.Full>
        <LinkPageInfo />
      </Layout.Content.Full>
      <Layout.Content.Full>
        <Suspense>
          <LinkSearchForm />
        </Suspense>
      </Layout.Content.Full>
      <Layout.Content.Full>
        <Suspense>
          <LinkList />
        </Suspense>
      </Layout.Content.Full>
    </>
  );
}
