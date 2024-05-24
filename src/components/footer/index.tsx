import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { Logo } from "../logo";
import { Link } from "react-router-dom";
import { RoutesEnum } from "@/enums";
import { Button } from "../button";
import { useTranslation } from "react-i18next";

type FooterProps = {
  withAuth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Footer: FC<FooterProps> = ({ className, withAuth, ...rest }) => {
  const { t } = useTranslation();
  return (
    <footer className={classNames("py-8", className)} {...rest}>
      <div className='flex justify-between mobile:flex-col gap-4'>
        <div>
          <Logo className='text-[1.5rem] !text-teal600' />
          {withAuth ? (
            <>
              <div className='flex gap-4 mb-2 mt-4 flex-wrap font-semibold'>
                <Link to={RoutesEnum.ACCOUNT}>{t("Account")}</Link>
                <Link to={RoutesEnum.CHATS}>{t("Chat")}</Link>
                <Link to={RoutesEnum.ADD_ITEM} className='text-orange400'>
                  {t("Add item")}
                </Link>
                <Link to={RoutesEnum.SIGN_IN}>{t("Log out")}</Link>
              </div>
              <div className='text-white400 flex flex-col gap-2'>
                <Link to={RoutesEnum.MY_DEALS}>{t("My deals")}</Link>
                <Link to={RoutesEnum.MY_ITEMS}>{t("My items")}</Link>
                <Link to={RoutesEnum.ACCOUNT}>{t("Settings")}</Link>
              </div>
            </>
          ) : (
            <div className='flex gap-4 text-white200 mb-2 mt-4 '>
              <Link to={RoutesEnum.SIGN_UP} className='text-orange400'>
                {t("Sign Up")}
              </Link>
              <span>
                Have an account?&nbsp;
                <Link to={RoutesEnum.SIGN_IN} className='text-orange400'>
                  {t("Sign In")}
                </Link>
              </span>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2 items-end mobile:items-start text-white200'>
          {t("Like to use mobile version?")}
          <Button size='sm' styleType='secondary' className='!py-2 font-semibold' voluminous>
            {t("Get our app")}
          </Button>
        </div>
      </div>
      <hr className='w-full h-px bg-white200 border-0 my-4' />
      <p className='text-white200 text-[0.75rem]'>© 2024 Swap It Up</p>
    </footer>
  );
};
