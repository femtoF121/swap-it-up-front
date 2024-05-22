import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { Logo } from "../logo";
import { LanguageSwitcher } from "../language-switcher";
import { Link } from "react-router-dom";
import { RoutesEnum } from "@/enums";
import { AccountIcon, ArrowDownIcon, ChatIcon } from "@/assets/icons";
import Dropdown from "../dropdown";
import { Button } from "../button";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  withAuth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Header: FC<HeaderProps> = ({ withAuth, className }) => {
  const { t } = useTranslation();
  return (
    <header className={classNames("bg-teal200 text-white100 rounded-b-[16px] py-4 px-8 w-full flex justify-between items-center", className)}>
      <div className='gap-8 flex items-center'>
        <Logo />{" "}
        {withAuth && (
          <Button voluminous size='sm' className='text-[24px] h-[48px]'>
            {t("Add item")}
          </Button>
        )}
      </div>
      <nav className='flex gap-8 text-[24px] items-center'>
        {withAuth ? (
          <>
            <Link to={RoutesEnum.CHATS} className='flex gap-2 items-center hover:text-teal600 hover:no-underline group hover:cursor-pointer'>
              <ChatIcon className='group-hover:stroke-teal600' />
              {t("Chat")}
            </Link>
            <LanguageSwitcher />
            <Dropdown>
              <Dropdown.Target className='flex gap-2 items-center hover:no-underline group hover:cursor-pointer'>
                <AccountIcon className='group-hover:stroke-teal600' />
                <span className='group-hover:text-teal600'>{t("Account")}</span>
                <ArrowDownIcon className='group-hover:stroke-teal600' />
              </Dropdown.Target>
              <Dropdown.List>
                <span className='text-[24px] text-teal400 mb-4 px-6'>Hello, Name!</span>
                <Dropdown.Item onClick={() => (window.location.href = RoutesEnum.MY_ITEMS)}>{t("My items")}</Dropdown.Item>
                <Dropdown.Item onClick={() => (window.location.href = RoutesEnum.MY_DEALS)}>{t("My deals")}</Dropdown.Item>
                <Dropdown.Item onClick={() => (window.location.href = RoutesEnum.CHATS)}>{t("Chat")}</Dropdown.Item>
                <Dropdown.Item onClick={() => (window.location.href = RoutesEnum.SETTINGS)}>{t("Settings")}</Dropdown.Item>
                <hr className='h-px w-full bg-teal600 my-2' />
                <Dropdown.Item onClick={() => alert("log out")}>{t("Log out")}</Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
          </>
        ) : (
          <>
            <LanguageSwitcher />{" "}
            <div className='hover:[&>*]:no-underline hover:[&>*]:text-teal600'>
              <Link to={RoutesEnum.SIGN_IN}>{t("Sign In")}</Link> | <Link to={RoutesEnum.SIGN_UP}>{t("Sign Up")}</Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};
