import { useGetColorsQuery, useGetDetailsQuery, useGetItemQuery } from "@/api/apiSlice";
import { ArrowDownIcon, LocationMarkerIcon } from "@/assets/icons";
import { Button, Card, Layout, Loader, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Badge } from "./components/badge";
import { STATE_OPTIONS } from "@/constants/select-options";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperButton } from "./components/swiper-button";
import { CustomSwiperSlide } from "./components/custom-swiper-slide";
import "swiper/css";
import "swiper/css/pagination";

const ItemDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetItemQuery(id);
  const { data: colors } = useGetColorsQuery();
  const { data: userData, isLoading: userIsLoading } = useGetDetailsQuery();

  return (
    <Layout className='flex flex-col'>
      <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
      {isLoading || userIsLoading ? (
        <Loader className='mx-auto mt-10' />
      ) : (
        <div className='flex gap-8 mt-6 flex-1 tablet:flex-col tablet:items-center'>
          <div className='w-full relative aspect-[10/8] max-w-[700px]'>
            <SwiperButton className='custom-prev-button absolute top-1/2 -translate-y-1/2 left-2 z-10'>
              <ArrowDownIcon className='rotate-90 stroke-teal600' />
            </SwiperButton>
            <SwiperButton className='custom-next-button absolute top-1/2 -translate-y-1/2 right-2 z-10'>
              <ArrowDownIcon className='-rotate-90 stroke-teal600' />
            </SwiperButton>
            <Swiper
              className='h-full rounded-2xl'
              grabCursor
              centeredSlides
              spaceBetween={20}
              navigation={{
                prevEl: ".custom-prev-button",
                nextEl: ".custom-next-button",
              }}
              pagination={{
                clickable: true,
              }}
              slidesPerView='auto'
              modules={[Navigation, Pagination]}>
              {data.pictureIds.map((id: string, index: number) => (
                <SwiperSlide className=''>
                  <CustomSwiperSlide imageId={id} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Card className='w-full flex flex-col max-w-[700px]'>
            <div className='flex justify-between gap-4 flex-wrap text-white200'>
              <span>
                {t("Published by")}{" "}
                <Link to={RoutesEnum.CHATS} className='text-green600'>
                  {userData.name} {userData.surname}
                </Link>
              </span>
              <div className='flex gap-2 items-center'>
                {(userData.address?.country || userData.address?.city) && (
                  <>
                    <LocationMarkerIcon />
                    <span>
                      {userData.address?.country}
                      {userData.address?.country && userData.address?.city && ", "}
                      {userData.address?.city}
                    </span>
                  </>
                )}
              </div>
            </div>
            <h1 className='text-4xl font-semibold my-4 leading-normal'>{data.name}</h1>
            <div className='flex flex-wrap gap-4'>
              {data.category && <Badge>{data.category}</Badge>}
              {data.color && colors && (
                <Badge className='flex gap-2 items-center'>
                  <div
                    className='size-4 outline outline-[1px] outline-teal600 rounded-full'
                    style={{ backgroundColor: colors.list.find(({ name }: { name: string; hex: string }) => name === data.color).hex }}
                  />
                  {data.color}
                </Badge>
              )}
              {(data.state !== null || data.state !== undefined) && (
                <Badge>
                  {t(STATE_OPTIONS.find(({ value }) => value == data.state)!.label)} {t("state")}
                </Badge>
              )}
            </div>
            <p className='my-4'>{data.description}</p>
            <div className='text-xl'>
              <p className='text-green600'>{t("Wants to exchange on")}:</p>
              <p>{data.wantedCategory > length ? data.wantedCategory.join(", ") : t("All")}</p>
            </div>
            <div className='flex flex-1 items-end gap-6 mt-8'>
              <Button size='sm' className='text-xl h-fit py-2 w-full max-w-[200px]'>
                {t("Exchange")}
              </Button>
              <Button variant='secondary' size='sm' className='text-xl h-fit py-2 w-full max-w-[200px]'>
                {t("Write to user")}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default ItemDetailsPage;
