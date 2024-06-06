import { Button, Card, Input, Layout, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { useTranslation } from "react-i18next";
import { ChangePasswordForm } from "./components/change-password-form";
import { changeInfoSchema } from "@/helpers/validation-schemas";
import { useFormik } from "formik";
import { useChangeDetailsMutation, useDeleteUserMutation, useGetDetailsQuery, useGetInfoQuery, useLazyGetAvatarQuery } from "@/api/apiSlice";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import avatarPlaceholder from "@/assets/images/avatar-placeholder.png";
import cn from "classnames";
import { CheckIcon, PlusIcon } from "@/assets/icons";
import { useNavigate } from "react-router-dom";
import withAuth from "@/hocs/with-auth";

const SettingsPage = () => {
  const { t } = useTranslation();
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [uploadedNewAvatar, setUploadedNewAvatar] = useState(false);
  const navigate = useNavigate();
  const [deletionConfirmation, setDeletionConfirmation] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, refetch } = useGetDetailsQuery();
  const userInfo = useGetInfoQuery();
  const [fetchAvatar, avatarResponse] = useLazyGetAvatarQuery();
  const [changeDetails] = useChangeDetailsMutation();
  const [deleteAccount] = useDeleteUserMutation();
  const { values, handleBlur, handleChange, handleSubmit, touched, errors, setFieldValue } = useFormik({
    initialValues: {
      name: t("Loading") + "...",
      surname: t("Loading") + "...",
      nickname: t("Loading") + "...",
      country: t("Loading") + "...",
      city: t("Loading") + "...",
      avatar: null,
    },
    onSubmit: async () => {
      let newAvatar;
      if (!avatar) {
        const avatarResp = await fetchAvatar(data.id);
        let image;
        let blob;
        image = await fetch(avatarResp.isSuccess ? `${import.meta.env.VITE_SERVER_URL}/user/details/${data.id}/avatar` : avatarPlaceholder);
        blob = avatar || (await image?.blob());
        newAvatar = new File([blob!], "avatar.jpg", { type: blob?.type });
      } else {
        newAvatar = avatar;
      }

      const response = await changeDetails({ name, surname, nickname, country, city, avatar: newAvatar });
      if (response.error) toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
      else toast.success(t("Information changed successfully"), { className: "!bg-green100" });
      refetch();
    },
    validationSchema: changeInfoSchema,
  });
  const { name, surname, nickname, country, city, avatar } = values;

  const handleDeleteAccount = async () => {
    const response = await deleteAccount();
    if (response.error) toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
    else toast.success(t("Account deleted successfully"), { className: "!bg-green100" });
    navigate(RoutesEnum.HOME);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setFieldValue("name", data.name || "");
      setFieldValue("surname", data.surname || "");
      setFieldValue("nickname", data.nickname || "");
      setFieldValue("country", data.address.country || "");
      setFieldValue("city", data.address.city || "");

      const fetchUserAvatar = async () => {
        try {
          await fetchAvatar(data.id);
        } catch (error) {
          console.error("Failed to fetch avatar:", error);
        }
      };

      fetchUserAvatar();
    }
  }, [data, isLoading, setFieldValue, fetchAvatar]);

  return (
    <Layout>
      <ReturnTo to={RoutesEnum.HOME}>return to Home page</ReturnTo>
      <h1 className='text-4xl font-semibold my-5'>{t("Settings")}</h1>
      <div className='flex gap-6 below-768:flex-col items-start'>
        <div className='above-769:max-w-[520px] w-full flex flex-col gap-6 items-center'>
          <Card className='w-full !p-8 flex flex-col items-center'>
            <div className='relative rounded-full overflow-hidden size-[250px]'>
              {isLoading || avatarResponse.isLoading ? (
                <div className='skeleton-loader' />
              ) : (
                <>
                  {!avatarLoaded && <div className='skeleton-loader' />}
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : avatarResponse.isSuccess
                        ? `${import.meta.env.VITE_SERVER_URL}/user/details/${data.id}/avatar`
                        : avatarPlaceholder
                    }
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
              {isLoading ? <div className='skeleton-loader' /> : nickname && <span>{data?.nickname}</span>}
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
            <div
              className={cn("relative mt-2", {
                "min-h-4 max-w-[200px] w-full": userInfo.isLoading,
                hidden: !userInfo.data?.email && !userInfo.isLoading,
              })}>
              {userInfo.isLoading ? <div className='skeleton-loader' /> : <span>{userInfo.data?.email}</span>}
            </div>
          </Card>
          <div className='below-768:hidden max-w-[300px]  w-full'>
            {deletionConfirmation ? (
              <div className='flex w-full gap-6'>
                <Button onClick={() => setDeletionConfirmation(false)} variant='secondary' className='w-full !text-base flex items-center'>
                  <PlusIcon className='rotate-45 size-6 mr-4 translate-y-[2px]' />
                  {t("No")}
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  variant='secondary'
                  className='w-full !text-base !text-teal600 flex items-center !shadow-teal600'>
                  <CheckIcon className='mr-4 size-5 translate-y-[1px]' />
                  {t("Yes")}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setDeletionConfirmation(true)}
                variant='secondary'
                className='!shadow-teal600 !text-teal600 !bg-transparent !text-base w-full'>
                {t("Delete account")}
              </Button>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-6 w-full'>
          <Card className='w-full'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-wrap gap-6 items-center'>
                <h2 className='text-2xl'>{t("Change personal info")}</h2>
                <Button
                  size='sm'
                  type='submit'
                  disabled={
                    !data ||
                    (data?.name === name &&
                      data?.surname === surname &&
                      ((data?.nickname === null && nickname === "") || data?.nickname === nickname) &&
                      ((data?.address.country === null && country === "") || data?.address.country === country) &&
                      ((data?.address.city === null && city === "") || data?.address.city === city) &&
                      (avatar === null || !uploadedNewAvatar)) ||
                    !!errors.name ||
                    !!errors.surname ||
                    !!errors.nickname
                  }>
                  {t("Save")}
                </Button>
              </div>
              <hr className='h-px border-0 bg-white200 w-full my-6' />
              <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-4'>
                <Input
                  label={t("Name")}
                  name='name'
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name ? JSON.stringify(errors.name) : undefined}
                />
                <Input
                  label={t("Surname")}
                  name='surname'
                  value={surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.surname ? JSON.stringify(errors.surname) : undefined}
                />
                <Input
                  label={t("Nickname")}
                  name='nickname'
                  value={nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nickname ? JSON.stringify(errors.nickname) : undefined}
                />
                <Input label={t("Country")} name='country' value={country} onChange={handleChange} onBlur={handleBlur} />
                <Input label={t("City")} name='city' value={city} onChange={handleChange} onBlur={handleBlur} />
                <label htmlFor='avatar' className='self-end mt-6'>
                  <input
                    ref={avatarInputRef}
                    id='avatar'
                    name='avatar'
                    type='file'
                    className='hidden'
                    onChange={(e) => {
                      if (e.currentTarget.files) {
                        if (e.currentTarget.files[0].type !== "image/png" && e.currentTarget.files[0].type !== "image/jpeg") {
                          toast.warn(t("file_has_to_be_png_or_jpg"), { className: "!bg-warn" });
                          return;
                        }

                        setUploadedNewAvatar(true);
                        setFieldValue("avatar", e.currentTarget.files[0]);
                      }
                    }}
                    accept='image/png, image/jpeg'
                  />
                  <Button
                    variant='secondary'
                    size='sm'
                    className='w-full h-[40px] !text-[16px]'
                    onClick={() => {
                      if (avatarInputRef.current) avatarInputRef.current.click();
                    }}>
                    {t("Upload avatar")}
                  </Button>
                </label>
              </div>
            </form>
          </Card>
          <ChangePasswordForm />
          <div className='above-769:hidden w-full'>
            {deletionConfirmation ? (
              <div className='flex w-full gap-4'>
                <Button
                  onClick={() => setDeletionConfirmation(false)}
                  variant='secondary'
                  className='w-full !text-base flex items-center justify-center'>
                  <PlusIcon className='rotate-45 size-6 mr-4 translate-y-[2px]' />
                  {t("No")}
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  variant='secondary'
                  className='w-full !text-base !text-teal600 flex items-center !shadow-teal600 justify-center'>
                  <CheckIcon className='mr-4 size-5 translate-y-[1px]' />
                  {t("Yes")}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setDeletionConfirmation(true)}
                variant='secondary'
                className='!shadow-teal600 !text-teal600 !bg-transparent !text-base w-full'>
                {t("Delete account")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(SettingsPage);
