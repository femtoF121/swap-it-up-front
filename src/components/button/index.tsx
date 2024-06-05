import classNames from "classnames";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  voluminous?: boolean;
  className?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  disabled,
  voluminous,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      type={type}
      className={classNames(
        "rounded-lg leading-[1.33] transition-all hover:brightness-95 will-change-transform select-none",
        {
          "grayscale cursor-not-allowed": disabled,
          "text-[1rem] px-6 h-[2.5rem]": size === "sm",
          "text-[1.5rem] px-8 py-3": size === "md",
          "bg-orange400 text-white50": variant === "primary",
          "bg-white50 text-orange400 shadow-[0_0_0_2px_inset] shadow-orange400": variant === "secondary",
          "drop-shadow-[0_4px_0_#C65600] active:translate-y-1 active:filter-none": voluminous,
        },
        className
      )}>
      {children}
    </button>
  );
};
