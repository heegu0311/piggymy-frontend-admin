'use client';

import { cva } from 'class-variance-authority';
import Link from 'next/link';

import { cn } from '@/utils/cn';

import StatusBadge from '../badge/StatusBadge';

export const CardVariants = cva('', {
  variants: {
    status: {
      selected: `border-2 border-[#6799F3] bg-[#F0F6FF] shadow-[3px_3px_10px_0_rgba(36,106,232,0.2)]`,
      unselected: `border border-[#ccc] bg-white`,
    },
  },
  defaultVariants: {
    status: 'unselected',
  },
});

interface CardProps {
  id: string;
  koreanTitle: string;
  englishTitle?: string;
  createdDate: string;
  isActive: boolean;
  isSelected: boolean;
  route: string;
  isChecked: boolean;
  onChangeChecked: (...args: any[]) => void;
  labels?: string[];
}

export default function Card({
  id,
  koreanTitle,
  englishTitle = '',
  createdDate,
  isActive,
  isSelected,
  route,
  isChecked,
  onChangeChecked,
  labels,
}: CardProps) {
  return (
    <div
      className={cn(
        CardVariants({ status: isSelected ? 'selected' : 'unselected' }),
        'flex h-[78px] w-[308px] items-center justify-between rounded-2xl px-3 py-3',
      )}
    >
      <input
        type="checkbox"
        id={id}
        name={id}
        className="h-[18px] w-[18px]"
        checked={isChecked}
        onChange={onChangeChecked}
      />
      <Link href={route} className="w-[190px]">
        <div className="break-keep font-bold">{koreanTitle}</div>
        <div className="break-keep font-bold">{englishTitle}</div>
        <div className="text-xs">{createdDate}</div>
      </Link>
      <StatusBadge isActive={isActive} labels={labels} />
    </div>
  );
}
