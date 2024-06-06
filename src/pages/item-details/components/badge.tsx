import cn from "classnames";
import { FC, ReactNode } from "react";

export const Badge: FC<{ children?: ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={cn("rounded-lg border border-teal600 py-2.5 px-6 leading-none", className)}>{children}</div>;
};
