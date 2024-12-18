import './globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import React from 'react';

import ReactQueryProvider from '@/app/_component/ReactQueryProvider';
import ModalProvider from '@/share/modal/ModalProvider';

import { MSWComponent } from './_component/MSWComponent';
import RecoilRootProvider from './_component/RecoilRootProvider';

const notoSansKr = Noto_Sans_KR({
  preload: false,
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <MSWComponent />
        <ConfigProvider
          theme={{
            token: { colorLink: 'inherit' },
            components: {
              Table: {
                headerBg: '#F4F5F8',
                headerBorderRadius: 0,
                borderColor: '#CDD1D9',
              },
              Collapse: {
                contentBg: '#f5f5f5',
                contentPadding: 0,
                headerBg: '#ffffff',
                borderRadiusLG: 0,
              },
            },
          }}
        >
          <RecoilRootProvider>
            <ReactQueryProvider>
              {/* <CheckAuth /> */}
              <AntdRegistry>{children}</AntdRegistry>
            </ReactQueryProvider>
            <ModalProvider />
          </RecoilRootProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
