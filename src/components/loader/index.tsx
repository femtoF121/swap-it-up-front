import { LoaderIcon } from "@/assets/icons";
import cn from "classnames";
import { FC } from "react";

export const Loader: FC<{ className?: string }> = ({ className }) => {
  return <LoaderIcon className={cn("animate-spin size-16", className)} />;
};
