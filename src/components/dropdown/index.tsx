import cn from "classnames";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { DropdownContext } from "./DropdownProvider";
import { DropDownTarget } from "./DropDownTarget";
import { DropdownList } from "./DropdownList";
import { DropdownListItem } from "./DropdownListItem";
import useOnClickOutside from "@/hooks/useClickOutside";

interface DropdownProps extends ComponentPropsWithoutRef<"div"> {}

const DropdownComponent: FC<DropdownProps> = ({ className, children, ...props }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const ref = useOnClickOutside(() => {
    if (open) onClose();
  });

  return (
    <DropdownContext.Provider value={{ open, onOpen, onClose }}>
      <div className={cn("relative", className)} ref={ref} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const Dropdown = Object.assign(DropdownComponent, {
  Target: DropDownTarget,
  List: DropdownList,
  Item: DropdownListItem,
});

export default Dropdown;
