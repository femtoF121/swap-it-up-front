import { createContext, useContext } from "react";

interface DropdownContextProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const DropdownContext = createContext<DropdownContextProps>(null!);

export const useDropdownContext = () => {
  const props = useContext(DropdownContext);
  if (!props) throw new Error("No dropdown context provided!");
  return props;
};
