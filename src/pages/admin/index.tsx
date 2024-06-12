import { useGetInfoQuery } from "@/api/apiSlice";
import { Layout, Loader, ReturnTo } from "@/components";
import { ADMIN_CREDS } from "@/constants/admin";
import { RoutesEnum } from "@/enums";
import withAuth from "@/hocs/with-auth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ColorsForm } from "./components/colors-form";
import { CategoriesForm } from "./components/categories-form";

const AdminPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetInfoQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      if (data.email !== ADMIN_CREDS.email) navigate(RoutesEnum.NOT_FOUND);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <Loader />
      </div>
    );
  else
    return (
      <Layout className='space-y-6'>
        <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
        <ColorsForm />
        <CategoriesForm />
      </Layout>
    );
};

export default withAuth(AdminPage);
