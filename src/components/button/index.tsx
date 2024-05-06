import classNames from "classnames";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type ButtonProps = {
  styleType: "primary" | "secondary";
  size: "sm" | "md";
  isVoluminous?: boolean;
  className?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ styleType, size, className, children, isVoluminous, ...rest }) => {
  return (
    <button
      className={classNames(
        "rounded-lg leading-[1.33] transition-all hover:brightness-90 will-change-transform",
        {
          "text-[16px] px-6 py-2": size === "sm",
          "text-[24px] px-8 py-3": size === "md",
          "bg-orange400 text-white50": styleType === "primary",
          "bg-white50 text-orange400 shadow-[0_0_0_3px_inset] shadow-orange400": styleType === "secondary",
          "drop-shadow-[0_4px_0_#C65600] active:translate-y-1 active:filter-none": isVoluminous,
        },
        className
      )}
      {...rest}>
      {children}
    </button>
  );
};
