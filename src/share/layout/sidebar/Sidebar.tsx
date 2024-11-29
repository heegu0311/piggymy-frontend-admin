'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HeaderType } from '@/type/routeType';

interface SidebarProps {
  title: string;
  sidebarList: HeaderType[];
}

export default function Sidebar({ sidebarList, title }: SidebarProps) {
  const routes = usePathname();

  return (
    <div className="fixed z-[100] h-screen w-[240px] min-w-48 bg-white pt-2">
      <ul>
        <li className="pb-2 pl-4 text-lg font-bold text-gray-4">{title}</li>
        {sidebarList
          ? sidebarList.map((item: HeaderType) => {
              const isActive = routes ? routes.includes(item.route) : false;
              return (
                <li
                  key={item.route}
                  className={`p-2 pb-3 pt-3 font-bold ${isActive ? 'bg-primary text-white' : 'bg-white'}`}
                >
                  <Link href={item.route} className="pl-2">
                    {item.title}
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
