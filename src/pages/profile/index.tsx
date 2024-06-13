import { useGetAvatarQuery, useGetUserDetailsQuery } from "@/api/apiSlice";
import { Button, Card, Layout, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import avatarPlaceholder from "@/assets/images/avatar-placeholder.png";
import cn from "classnames";

const ProfilePage = () => {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUserDetailsQuery(id);
  const avatar = useGetAvatarQuery(id);
  console.log(avatar);
  return (
    <Layout>
      <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
      <div className='mx-auto w-full max-w-[400px] mt-6'>
        <Card className='w-full !p-8 flex flex-col items-center'>
          <div className='relative rounded-full overflow-hidden size-[250px]'>
            {isLoading || avatar.isLoading ? (
              <div className='skeleton-loader' />
            ) : (
              <>
                {!avatarLoaded && <div className='skeleton-loader' />}
                <img
                  src={avatar.data ? `${import.meta.env.VITE_SERVER_URL}/user/details/${data.id}/avatar` : avatarPlaceholder}
                  alt='avatar'
                  className={cn("rounded-full aspect-square h-[250px] object-cover", { hidden: !avatarLoaded })}
                  onLoad={() => setAvatarLoaded(true)}
                  height={250}
                  width={250}
                />
              </>
            )}
          </div>
          <div className={cn("relative mt-6", { "min-h-6 max-w-[250px] w-full": isLoading, hidden: !(data?.name || data?.surname) && !isLoading })}>
            {isLoading ? (
              <div className='skeleton-loader' />
            ) : (
              <span className='font-semibold text-2xl'>
                {data?.name} {data?.surname}
              </span>
            )}
          </div>
          <div className={cn("relative mt-1", { "min-h-4 max-w-[150px] w-full": isLoading, hidden: !data?.nickname && !isLoading })}>
            {isLoading ? <div className='skeleton-loader' /> : data?.nickname && <span>{data?.nickname}</span>}
          </div>
          <div
            className={cn("relative mt-1", {
              "min-h-4 max-w-[300px] w-full": isLoading,
              hidden: !(data?.address.country || data?.address.city) && !isLoading,
            })}>
            {isLoading ? (
              <div className='skeleton-loader' />
            ) : (
              (!!data?.address.country || !!data?.address.city) && (
                <span className='text-white200'>
                  {data?.address.country}
                  {data?.address.country && data?.address.city && ", "}
                  {data?.address.city}
                </span>
              )
            )}
          </div>
        </Card>
        <Link to={RoutesEnum.CHATS}>
          <Button size='sm' className='w-full mt-4'>
            {t("Write to user")}
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default ProfilePage;
