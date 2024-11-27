'use client';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetBannerList } from '@/share/query/banner/useGetBannerList';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Icon from '@/share/ui/icon/Icon';
import Add from '@/share/ui/list-item/Add';
import Banner from '@/share/ui/list-item/Banner';
import Title from '@/share/ui/title/Title';

interface RollingBannerListProps {
  currentBannerId?: number;
}

export default function RollingBannerList({
  currentBannerId,
}: RollingBannerListProps) {
  const { data } = useGetBannerList();
  const swiperRef = useRef<SwiperType>();

  return (
    <ContentBox
      topLeft={
        <Title>
          생성된 롤링 배너{' '}
          <Title.H>{data?.data ? data?.data.list.length : 0}</Title.H> 건
        </Title>
      }
      className={'flex'}
    >
      <div className="mt-4 flex w-full items-start justify-start gap-2">
        <Add
          route="/admin/content/rollingBanner"
          type="banner"
          isSelected={currentBannerId === undefined}
        />
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="h-[234px] text-primary"
        >
          <Icon icon="prev" />
        </button>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Navigation]}
          initialSlide={
            data?.data.list.findIndex((data) => data.id === currentBannerId) ||
            0
          }
        >
          {data?.data &&
            data?.data.list.map((banner) => {
              const {
                title,
                id,
                type,
                buttonName,
                imagePath,
                imageName,
                createdDate,
                exposureStartDate,
                exposureEndDate,
                isUse,
              } = banner;
              const today = dayjs().format('YYYY-MM-DD');
              const isActive = dayjs(today).isBetween(
                exposureStartDate,
                exposureEndDate,
                'day',
                '()',
              );

              return (
                <SwiperSlide key={id} className="">
                  <Banner
                    title={title}
                    category={type}
                    buttonTitle={buttonName}
                    image={imagePath + imageName}
                    isActive={isActive && isUse}
                    isSelected={currentBannerId === id}
                    createdDate={dayjs(createdDate)}
                    route={`/admin/content/rollingBanner/${id}`}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="h-[234px] text-primary"
        >
          <Icon icon="next" />
        </button>
      </div>
    </ContentBox>
  );
}
