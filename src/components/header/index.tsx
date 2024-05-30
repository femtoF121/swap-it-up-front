import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { Logo } from "../logo";
import { LanguageSwitcher } from "../language-switcher";
import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "@/enums";
import { AccountIcon, ArrowDownIcon, ChatIcon, PlusIcon } from "@/assets/icons";
import Dropdown from "../dropdown";
import { Button } from "../button";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { BurgerMenu } from "../burger-menu";

type HeaderProps = {
  withAuth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Header: FC<HeaderProps> = ({ withAuth, className }) => {
  const { t } = useTranslation();
  const { mobile, tablet } = useBreakpoints();
  const navigate = useNavigate();

  return (
    <header className={classNames("bg-teal200 text-white100 rounded-b-[1rem] py-4 px-8 w-full flex justify-between items-center", className)}>
      <div className='gap-8 flex items-center'>
        <Logo />{" "}
        {withAuth && (
          <Button voluminous size='sm' className='!text-[1.5rem] !h-[3rem] mobile:px-4' onClick={() => navigate(RoutesEnum.ADD_ITEM)}>
            {tablet ? <PlusIcon strokeWidth='3' /> : t("Add item")}
          </Button>
        )}
      </div>
      {mobile ? (
        <BurgerMenu />
      ) : (
        <nav className='flex gap-8 text-[1.5rem] items-center'>
          {withAuth ? (
            <>
              {!tablet && (
                <Link to={RoutesEnum.CHATS} className='flex gap-2 items-center hover:text-teal600 hover:no-underline group hover:cursor-pointer'>
                  <ChatIcon className='group-hover:stroke-teal600' />
                  {t("Chat")}
                </Link>
              )}
              <LanguageSwitcher />
              <Dropdown>
                <Dropdown.Target className='flex gap-2 items-center hover:no-underline group hover:cursor-pointer'>
                  <AccountIcon className='group-hover:stroke-teal600' />
                  <span className='group-hover:text-teal600'>{t("Account")}</span>
                  <ArrowDownIcon className='group-hover:stroke-teal600' />
                </Dropdown.Target>
                <Dropdown.List>
                  <span className='text-[1.5rem] text-teal400 mb-4 px-6'>{t("Hello")}, Name!</span>
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
      )}
    </header>
  );
};
