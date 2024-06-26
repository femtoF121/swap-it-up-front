import classNames from "classnames";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Logo } from "../logo";
import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "@/enums";
import { Button } from "../button";
import { useTranslation } from "react-i18next";
import { useLogoutMutation } from "@/api/apiSlice";

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type FooterProps = {
  withAuth?: boolean;
  isAdmin?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Footer: FC<FooterProps> = ({ className, withAuth, isAdmin = false, ...rest }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log(deferredPrompt);
      deferredPrompt.prompt();
      // const choiceResult = await deferredPrompt.userChoice;
      // if (choiceResult.outcome === "accepted") {
      //   console.log("User accepted the install prompt");
      // } else {
      //   console.log("User dismissed the install prompt");
      // }
      //setDeferredPrompt(null); // Reset the deferred prompt
    }
  };

  return (
    <footer className={classNames("py-8", className)} {...rest}>
      <div className='flex justify-between mobile:flex-col gap-4'>
        <div>
          <Logo className='text-[1.5rem] !text-teal600' />
          {withAuth ? (
            <>
              <div className='flex gap-4 mb-2 mt-4 flex-wrap font-semibold'>
                {isAdmin ? (
                  <Link to={RoutesEnum.ADMIN} className='text-orange400'>
                    {t("Admin controls")}
                  </Link>
                ) : (
                  <>
                    <Link to={RoutesEnum.SETTINGS}>{t("Account")}</Link>
                    <Link to={RoutesEnum.CHATS}>{t("Chat")}</Link>
                    <Link to={RoutesEnum.ADD_ITEM} className='text-orange400'>
                      {t("Add item")}
                    </Link>
                  </>
                )}
                <div
                  onClick={() => {
                    logout();
                    navigate(RoutesEnum.SIGN_IN);
                  }}
                  className='cursor-pointer hover:underline decoration-[1.5px]'>
                  {t("Log out")}
                </div>
              </div>
              <div className='text-white400 flex flex-col gap-2'>
                {!isAdmin && (
                  <>
                    <Link to={RoutesEnum.MY_DEALS}>{t("My deals")}</Link>
                    <Link to={RoutesEnum.MY_ITEMS}>{t("My items")}</Link>
                  </>
                )}
                <Link to={RoutesEnum.SETTINGS}>{t("Settings")}</Link>
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
          <Button onClick={handleInstallClick} size='sm' variant='secondary' className='!py-2 font-semibold' voluminous>
            {t("Get our app")}
          </Button>
        </div>
      </div>
      <hr className='w-full h-px bg-white200 border-0 my-4' />
      <p className='text-white200 text-[0.75rem]'>© 2024 Swap It Up</p>
    </footer>
  );
};
