import { Layout, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import withAuth from "@/hocs/with-auth";
import { useTranslation } from "react-i18next";

const ChatsPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
      <div className='mt-6 flex gap-6'>
        <div className='w-1/3 h-full'>
          <h1 className='font-semibold text-4xl'>Chats</h1>
        </div>
        <div className='w-2/3 h-full'></div>
      </div>
      <h2 className='text-7xl font-bold text-center uppercase mt-10'>coming soon</h2>
    </Layout>
  );
};

export default withAuth(ChatsPage);
