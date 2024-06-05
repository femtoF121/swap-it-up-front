import { useDeleteItemMutation, useGetMyItemsQuery } from "@/api/apiSlice";
import { ItemCard, Layout, Loader, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import withAuth from "@/hocs/with-auth";
import { ItemPayload } from "@/types/item";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const MyItemsPage = () => {
  const { t } = useTranslation();
  const { data, isLoading, refetch } = useGetMyItemsQuery();
  const [deleteItem] = useDeleteItemMutation();

  const handleDelete = async (id: string) => {
    const response = await deleteItem(id);
    if (response.error) toast.error(t("Item deletion failed"), { className: "!bg-error" });
    else toast.success(t("Item deleted successfully"), { className: "!bg-green100" });
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout>
      <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
      <h1 className='text-4xl font-semibold my-5'>{t("My Items")}</h1>
      {!data || isLoading ? (
        <Loader className='mx-auto mt-10' />
      ) : (
        <>
          {data.list.length <= 0 ? (
            <h1 className='text-center text-3xl mt-10'>{t("You don't  have any items yet")}</h1>
          ) : (
            <div className='items-grid'>
              {data.list.map(({ id, name, description, category, wantedCategory, pictureIds }: ItemPayload) => (
                <ItemCard
                  id={id}
                  key={id}
                  img={`${import.meta.env.VITE_SERVER_URL}/items/pictures/${pictureIds[0]}`}
                  title={name}
                  category={category}
                  description={description}
                  wanted={wantedCategory}
                  myItem
                  handleDelete={() => handleDelete(id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default withAuth(MyItemsPage);
