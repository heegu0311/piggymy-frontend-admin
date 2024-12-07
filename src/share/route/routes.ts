type ListType = {
  title: string;
  route: string;
};

export const contentList: ListType[] = [
  { title: '그리팅 메세지 관리', route: '/admin/content/greetingMessage' },
  { title: '롤링 배너 관리', route: '/admin/content/rollingBanner' },
  { title: '테마별 카드모음집 관리 ⚒️', route: '/admin/content/themeCard' },
  { title: '배지 관리 ⚒️', route: '/admin/content/badge' },
  { title: '링크 관리 ⚒️', route: '/admin/content/link' },
];

export const vocaQuizList: ListType[] = [
  { title: '용어카드 관리️', route: '/admin/quiz/vocaManagement' },
  { title: '퀴즈카드 관리️', route: '/admin/quiz/quizManagement' },
];

export const settingList: ListType[] = [
  // { title: '전체 알림', route: '/admin/setting/' },
  // { title: '신규 알림 등록', route: '/admin/setting/' },
  // { title: '전체 공지 사항', route: '/admin/setting/' },
  // { title: '신규 공지 사항 등록', route: '/admin/setting/' },
  // { title: '전체 FAQ', route: '/admin/setting/' },
  // { title: '신규 FAQ 등록', route: '/admin/setting/' },
  { title: '서비스 이용 약관 ⚒️', route: '/admin/setting/agreement' },
  { title: '개인 정보 처리 방침 ⚒️', route: '/admin/setting/privacy' },
];

export const userList: ListType[] = [
  { title: '기본 정보 관리 ⚒️', route: '/admin/user/basicInfo' },
  { title: '회원 의견 관리 ⚒️', route: '/admin/user/comment' },
];
export const memberList: ListType[] = [
  { title: '관리자 정보 관리 ⚒️', route: '/admin/member/basicInfo' },
];
