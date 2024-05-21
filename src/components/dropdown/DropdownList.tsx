import { ComponentPropsWithoutRef, FC } from "react";
import { useDropdownContext } from "./DropdownProvider";
import cn from "classnames";

interface DropdownListProps extends ComponentPropsWithoutRef<"div"> {}

export const DropdownList: FC<DropdownListProps> = ({ children, className }) => {
  const props = useDropdownContext();

  return (
    <div
      className={cn(
        "absolute py-6 bg-orange50 rounded-2xl transition-all origin-top-right text-teal600 text-[24px] flex flex-col min-w-[250px] right-0 translate-y-4 items-start",
        props.open ? "opacity-100 scale-100" : "opacity-0 scale-0",
        className
      )}>
      {children}
    </div>
  );
};
