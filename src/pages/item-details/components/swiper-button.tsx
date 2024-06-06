import cn from "classnames";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type SwiperButtonProps = {
  className?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SwiperButton: FC<SwiperButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button type='button' {...rest} className={cn("bg-green100/50 rounded-lg size-[40px] flex justify-center items-center", className)}>
      {children}
    </button>
  );
};
