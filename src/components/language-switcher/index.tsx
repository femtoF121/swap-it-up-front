import cn from "classnames";
import i18next from "i18next";
import { ComponentPropsWithoutRef, FC, useState } from "react";

interface LanguageSwitcherProps extends ComponentPropsWithoutRef<"div"> {
  highlightColor?: string;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ highlightColor = "text-teal600", className }) => {
  const [lng, setLng] = useState(i18next.language.slice(0, 2));

  const changeLngToEn = () => {
    i18next.changeLanguage("en");
    setLng("en");
  };
  const changeLngToUk = () => {
    i18next.changeLanguage("uk");
    setLng("uk");
  };

  return (
    <div className={cn("hover:[&>*]:cursor-pointer", className)}>
      <span className={cn(lng === "uk" ? highlightColor : "", `hover:${highlightColor}`)} onClick={changeLngToUk}>
        UA
      </span>{" "}
      |{" "}
      <span className={cn(lng === "en" ? highlightColor : "", `hover:${highlightColor}`)} onClick={changeLngToEn}>
        EN
      </span>
    </div>
  );
};
