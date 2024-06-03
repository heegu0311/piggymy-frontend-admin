import React from 'react';

import Breadcrumb from '@/share/ui/breadcrumb/Breadcrumb';
import Title from '@/share/ui/title/Title';

export default function GreetingMessagePageInfo() {
  return (
    <div className="ml-3 mt-5 flex items-center justify-start gap-5">
      <Title>그리팅 메시지 관리</Title>
      <Breadcrumb path={['콘텐츠', '그리팅 메시지 관리']} />
    </div>
  );
}
