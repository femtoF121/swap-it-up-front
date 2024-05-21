import { ComponentPropsWithoutRef, FC } from "react";
import { useDropdownContext } from "./DropdownProvider";
import cn from "classnames";

interface DropdownListItem extends ComponentPropsWithoutRef<"button"> {}

export const DropdownListItem: FC<DropdownListItem> = ({ onClick, className, children }) => {
  const props = useDropdownContext();

  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        props.onClose();
      }}
      className={cn(className, "px-6 py-2 hover:backdrop-brightness-95 w-full text-left")}>
      {children}
    </button>
  );
};
