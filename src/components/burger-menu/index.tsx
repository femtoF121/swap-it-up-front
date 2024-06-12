import { BurgerMenuIcon, PlusIcon } from "@/assets/icons";
import { RoutesEnum } from "@/enums";
import cn from "classnames";
import { ComponentPropsWithoutRef, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "../language-switcher";

interface BurgerMenuProps extends ComponentPropsWithoutRef<"div"> {
  userName?: string;
  withAuth: boolean | undefined;
  isAdmin?: boolean;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ className, userName, withAuth, isAdmin = false }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    open ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className={cn("", className)}>
      <BurgerMenuIcon className='size-10 cursor-pointer' onClick={handleOpen} />
      <div
        className={cn(
          "absolute z-[100] top-0 right-0 w-screen h-screen duration-300 transition-all overflow-hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}>
        <div
          className={cn("h-full w-full bg-white400/20", open ? "visible  delay-300" : "invisible")}
          onClick={handleClose}
          onTouchStart={handleClose}
        />
        <div className='w-[300px] ml-auto bg-white100 h-full p-6 absolute top-0 right-0 text-teal600 text-3xl'>
          <div className='flex justify-between items-center mb-12'>
            <LanguageSwitcher highlightColor='text-teal400' />
            <PlusIcon className='rotate-45 text-white400 size-10 ml-auto' onClick={handleClose} />
          </div>
          <div className=' flex flex-col gap-6'>
            {withAuth ? (
              <>
                <span className='text-teal400'>
                  {t("Hello")}, {userName}!
                </span>
                {isAdmin ? (
                  <Link to={RoutesEnum.ADMIN}>{t("Admin controls")}</Link>
                ) : (
                  <>
                    <Link to={RoutesEnum.MY_ITEMS}>{t("My items")}</Link>
                    <Link to={RoutesEnum.MY_DEALS}>{t("My deals")}</Link>
                    <Link to={RoutesEnum.CHATS}>{t("Chat")}</Link>
                  </>
                )}
                <Link to={RoutesEnum.SETTINGS}>{t("Settings")}</Link>
                <hr className='h-px w-full bg-teal600 my-2' />
                <Link to={RoutesEnum.SIGN_IN}>{t("Log out")}</Link>
              </>
            ) : (
              <>
                <Link to={RoutesEnum.SIGN_IN}>{t("Sign In")}</Link>
                <Link to={RoutesEnum.SIGN_UP}>{t("Sign Up")}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
