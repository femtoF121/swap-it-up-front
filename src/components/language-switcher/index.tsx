import i18next from "i18next";

export const LanguageSwitcher = () => {
  const changeLngToEn = () => {
    i18next.changeLanguage("en");
  };
  const changeLngToUk = () => {
    i18next.changeLanguage("uk");
  };

  return (
    <div className='hover:[&>*]:text-teal600 hover:[&>*]:cursor-pointer'>
      <span className={i18next.language === "uk" ? "text-teal600" : ""} onClick={changeLngToUk}>
        UA
      </span>{" "}
      |{" "}
      <span className={i18next.language === "en" ? "text-teal600" : ""} onClick={changeLngToEn}>
        EN
      </span>
    </div>
  );
};
