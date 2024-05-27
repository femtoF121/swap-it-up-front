import { useState } from "react";
import { Button } from "../button";
import cn from "classnames";
import { ArrowDownIcon } from "@/assets/icons";

export const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button
      onClick={scrollToTop}
      styleType='secondary'
      className={cn(
        "fixed !size-16 !rounded-full bottom-5 right-5 transition-all duration-1000",
        visible ? "opacity-70 visible" : "opacity-0 invisible"
      )}>
      <ArrowDownIcon className='fill-orange400 stroke-transparent rotate-180 absolute inset-2 size-12' />
    </Button>
  );
};
