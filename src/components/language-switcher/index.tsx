import cn from "classnames";
import i18next from "i18next";
import { ComponentPropsWithoutRef, FC } from "react";

interface LanguageSwitcherProps extends ComponentPropsWithoutRef<"div"> {
  highlightColor?: string;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ highlightColor = "text-teal600", className }) => {
  const changeLngToEn = () => {
    i18next.changeLanguage("en");
  };
  const changeLngToUk = () => {
    i18next.changeLanguage("uk");
  };

  return (
    <div className={cn(`hover:[&>*]:${highlightColor} hover:[&>*]:cursor-pointer`, className)}>
      <span className={i18next.language.slice(0, 2) === "uk" ? highlightColor : ""} onClick={changeLngToUk}>
        UA
      </span>{" "}
      |{" "}
      <span className={i18next.language.slice(0, 2) === "en" ? highlightColor : ""} onClick={changeLngToEn}>
        EN
      </span>
    </div>
  );
};
