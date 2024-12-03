'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import update from '@/../public/img/piggy/Updating-390 Piggy@3x.png';
import { useGetVoca } from '@/share/query/webViewVoca/useGetVoca';

export default function VocaImage() {
  const params = useParams();
  const { data } = useGetVoca(Number(params.vocaId));
  return (
    <>
      {data?.imageName && data.imagePath ? (
        <section>
          <Image
            src={data.imagePath + data.imageName}
            alt="img"
            width={768}
            className="min-h-[184px] bg-gray-6"
          />
          <p className="p-4 text-xs font-normal text-gray-3">
            출처: {data.sourceName}
          </p>
        </section>
      ) : (
        <section>
          <Image
            src={update}
            alt="img"
            width={768}
            className="min-h-[184px] bg-gray-6"
          />
          <p className="p-4 text-xs font-normal text-gray-3">
            출처: {data?.sourceName}
          </p>
        </section>
      )}
    </>
  );
}
