import { useEffect, useState } from "react";

import { breakpoints } from "@/constants/breakpoints.ts";

export const useBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState({
    mobile: false,
    tablet: false,
    desktop: false,
  });

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
      const newBreakpoint = {
        mobile: width <= parseInt(breakpoints.mobile.max),
        tablet: width <= parseInt(breakpoints.tablet.max),
        desktop: width >= parseInt(breakpoints.desktop.min),
      };
      setBreakpoint(newBreakpoint);
    };

    window.addEventListener("resize", updateBreakpoint);
    updateBreakpoint();

    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
};
