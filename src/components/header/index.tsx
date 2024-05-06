import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { Logo } from "../logo";

type HeaderProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={classNames("bg-teal200 rounded-b-[16px] py-6 px-8 w-full flex justify-between items-center", className)}>
      <Logo /> UA | EN Sign in | Sign up
    </header>
  );
};
