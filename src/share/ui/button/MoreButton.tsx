import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';

import arrow from '/public/img/Icon/Name=Arrowback-R@3x.png';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function MoreButton({ ...props }: IconButtonProps) {
  return (
    <button
      className=" p-[9px]text-[11px] flex content-center items-center rounded-[10px] font-bold text-[#999999]"
      {...props}
    >
      <div className="text-center">더보기 </div>
      <Image src={arrow} alt="더보기" width={22} height={22} color="#999999" />
    </button>
  );
}
