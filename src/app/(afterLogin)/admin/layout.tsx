import type { Metadata } from 'next';

import Header from '@/share/layout/header/Header';
import Layout from '@/share/layout/Layout';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Layout.Header>
        <Header user="홍길동" />
      </Layout.Header>
      {children}
    </Layout>
  );
}
