import cn from "classnames";
import { FC, HTMLAttributes } from "react";

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => {
  return (
    <div className={cn("rounded-2xl bg-white100 shadow-card p-6", className)} {...rest}>
      {children}
    </div>
  );
};
