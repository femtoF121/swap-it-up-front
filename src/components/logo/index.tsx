import { RoutesEnum } from "@/enums";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
};

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link to={RoutesEnum.HOME} className={classNames("text-white100 text-[36px] font-jost hover:no-underline", className)}>
      Swap<span className='text-orange400'>It</span>Up
    </Link>
  );
};
