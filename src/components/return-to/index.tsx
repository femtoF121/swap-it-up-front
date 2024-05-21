import { ArrowLeftIcon } from "@/assets/icons";
import cn from "classnames";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

interface ReturnToProps extends LinkProps {}

export const ReturnTo: FC<ReturnToProps> = ({ to, className, children, ...rest }) => {
  return (
    <Link {...rest} className={cn("flex gap-2 items-center", className)} to={to}>
      <ArrowLeftIcon />
      {children}
    </Link>
  );
};
