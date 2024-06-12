import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from "@/api/apiSlice";
import { PlusIcon } from "@/assets/icons";
import { Button, Card, Input, Loader } from "@/components";
import cn from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const CategoriesForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: categories, isLoading, refetch } = useGetCategoriesQuery();

  const handleAddCategory = async () => {
    setName("");
    if (!name) {
      setNameError(t("Name is required"));
      return;
    }
    const response = await addCategory(name);
    console.log(response);
    if (response.error) toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
    refetch();
  };

  const handleDeleteCategory = async (categoryName: string) => {
    const response = await deleteCategory(categoryName);
    if (response.error) toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
    refetch();
  };

  return (
    <Card>
      <h2 className='text-3xl font-semibold mb-6'>{t("Categories")}</h2>
      <div className='flex gap-8 flex-col'>
        <div className='flex items-end gap-4 max-w-[300px] w-full'>
          <Input
            label={t("Category name")}
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=''
            error={nameError && nameError}
          />
          <Button
            variant='secondary'
            size='sm'
            className={cn("!px-[8px] !h-[40px] !transition", { "mb-[16px]": nameError })}
            onClick={handleAddCategory}>
            <PlusIcon className='size-[24px]' />
          </Button>
        </div>
        <div className='flex flex-col gap-4'>
          <h3 className='text-[16px]'>{t("Existing categories")}:</h3>
          {isLoading ? (
            <Loader className='size-8' />
          ) : (
            <div className='flex gap-4 flex-wrap'>
              {categories.list.map(({ name }: any, index: number) => (
                <div
                  key={index}
                  className='flex text-[16px] gap-2 items-center border border-white200 rounded-lg h-[40px] p-3 pr-1 bg-white50 leading-none w-fit'>
                  {name}
                  <PlusIcon
                    className='size-5 rotate-45 hover:stroke-soft-red p-1 box-content cursor-pointer'
                    onClick={() => handleDeleteCategory(name)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
