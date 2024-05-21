import { ComponentPropsWithoutRef, FC } from "react";
import { useDropdownContext } from "./DropdownProvider";
import cn from "classnames";

interface DropdownButtonProps extends ComponentPropsWithoutRef<"button"> {}

export const DropDownTarget: FC<DropdownButtonProps> = ({ children, className, onClick, ...rest }) => {
  const props = useDropdownContext();
  return (
    <button
      {...rest}
      className={cn(className, "")}
      onClick={(e) => {
        onClick?.(e);
        props.open ? props.onClose() : props.onOpen();
        console.log("target", props.open);
      }}>
      {children}
    </button>
  );
};
