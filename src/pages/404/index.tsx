import { Layout, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Error404Page = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
      <div className='p-12 w-full text-center font-semibold my-4 relative bg-404 bg-cover'>
        <h1 className='text-[8rem] leading-none font-jost font-bold mb-8 text-white50 drop-shadow-lg'>404</h1>
        <h2 className='text-2xl mb-2'>{t("Sorry, but the page you were looking for could not be found.")}</h2>
        <p>
          {t("Return to the")}{" "}
          <Link to={RoutesEnum.HOME} className='text-orange400'>
            {t("Home page")}
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Error404Page;
