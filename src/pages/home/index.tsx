import { Button, CustomSelect, Input, ItemCard, Layout, Loader, Rating, ScrollButton } from "@/components";
import { PlusIcon, SearchIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useGetCategoriesQuery, useGetColorsQuery, useLazyGetItemsQuery } from "@/api/apiSlice";
import { categoriesOptions, colorOptions } from "@/helpers/select-options";
import { ItemPayload } from "@/types/item";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { t } = useTranslation();
  const [getItems, { data, isLoading }] = useLazyGetItemsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: colors, isLoading: colorLoading } = useGetColorsQuery();
  const { values, handleSubmit, handleChange, setFieldValue, resetForm } = useFormik({
    initialValues: {
      category: [],
      color: [],
      wantedCategory: [],
      search: "",
    },
    onSubmit: () => {
      getItems({
        search,
        category: category.map(({ value }) => value),
        color: color.map(({ value }) => value),
        wantedCategory: wantedCategory.map(({ value }) => value),
      });
    },
  });

  const { search, category, color, wantedCategory } = values;

  useEffect(() => {
    getItems({
      search,
      category: category.map(({ value }) => value),
      color: color.map(({ value }) => value),
      wantedCategory: wantedCategory.map(({ value }) => value),
    });
  }, [category, color, wantedCategory]);

  const [stars, setStars] = useState([false, false, false, false, false]);

  return (
    <>
      <Layout>
        <Rating stars={stars} setStars={setStars} />
        <form onSubmit={handleSubmit}>
          <h3 className='text-2xl font-semibold mb-3 flex items-end gap-10'>
            {t("Filters")}
            {(values.category.length > 0 || values.color.length > 0 || values.wantedCategory.length > 0 || values.search) && (
              <span className='font-[500] text-base flex items-center cursor-pointer hover:text-orange400' onClick={() => resetForm()}>
                {t("clear all")}
                <PlusIcon className='rotate-45 size-5' />
              </span>
            )}
          </h3>
          <div className='flex gap-8 w-full mx-auto mb-6 items-end flex-wrap justify-between'>
            <div className='flex gap-6 flex-wrap'>
              <CustomSelect
                label={t("Category")}
                placeholder={t("All")}
                isMulti
                options={categoriesOptions(categories, t)}
                onChange={(category) => setFieldValue("category", category)}
                value={values.category}
                className='min-w-[200px]'
              />
              <CustomSelect
                label={t("Color")}
                placeholder={t("All")}
                isMulti
                options={colorOptions(colors, t)}
                onChange={(colors) => setFieldValue("color", colors)}
                value={values.color}
                className='min-w-[200px]'
              />
              <CustomSelect
                label={t("Wanted categories")}
                placeholder={t("All")}
                isMulti
                options={categoriesOptions(categories, t)}
                onChange={(wantedCategory) => setFieldValue("wantedCategory", wantedCategory)}
                value={values.wantedCategory}
                className='min-w-[200px]'
              />
            </div>
            <div className='flex max-w-[500px] min-w-[300px] w-full gap-4 h-[48px]'>
              <Input
                type='text'
                name='search'
                className='shrink'
                inputClassName='!border-orange100 border-[2px] !h-full'
                placeholder={t("What are you looking for?")}
                onChange={handleChange}
                value={values.search}
              />
              <Button type='submit' variant='secondary' className='shrink-0 font-semibold !bg-orange50 !p-[12px]'>
                <SearchIcon />
              </Button>
            </div>
          </div>
        </form>
        {!data || isLoading || colorLoading ? (
          <Loader className='mx-auto mt-10' />
        ) : (
          <div className='items-grid'>
            {data.list.map(({ id, name, description, category, wantedCategory, pictureIds, color }: ItemPayload) => (
              <ItemCard
                id={id}
                key={id}
                img={pictureIds[0] ? `${import.meta.env.VITE_SERVER_URL}/items/pictures/${pictureIds[0]}` : ""}
                title={name}
                category={category}
                description={description}
                wanted={wantedCategory}
                color={colors.list.find(({ name }: { name: string }) => name === color)}
              />
            ))}
          </div>
        )}
      </Layout>
      <ScrollButton />
    </>
  );
};

export default HomePage;
