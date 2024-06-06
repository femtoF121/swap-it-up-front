import { Button, Card, CustomSelect, Input, Layout, Loader, ReturnTo, Textarea } from "@/components";
import { STATE_OPTIONS } from "@/constants/select-options";
import { RoutesEnum } from "@/enums";
import { editItemSchema } from "@/helpers/validation-schemas";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ImageUploading } from "./components/image-uploading";
import { toast } from "react-toastify";
import withAuth from "@/hocs/with-auth";
import { useChangeItemMutation, useGetCategoriesQuery, useGetColorsQuery, useGetItemQuery } from "@/api/apiSlice";
import { OptionType } from "@/types/option";
import { categoriesOptions, colorOptions } from "@/helpers/select-options";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import cn from "classnames";

type FormValues = {
  name: string;
  description: string;
  color: OptionType | null;
  state: OptionType | null;
  wantedCategory: OptionType[] | null;
  pictureIds: string[];
};

const initialValues: FormValues = {
  name: "Loading",
  color: null,
  state: null,
  wantedCategory: null,
  description: "",
  pictureIds: [],
};

const EditItemPage = () => {
  const { t } = useTranslation();
  const [changeItem] = useChangeItemMutation();
  const { id } = useParams<{ id: string }>();
  const { data: item, refetch } = useGetItemQuery(id);
  const { data: categories } = useGetCategoriesQuery();
  const { data: colors } = useGetColorsQuery();
  const { errors, touched, handleBlur, values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
      try {
        console.log("sent values", {
          id: item.id,
          name,
          description,
          color: color!.value,
          state: parseInt(state!.value),
          wantedCategory: wantedCategory ? wantedCategory.map(({ value }) => value) : [],
          pictureIds,
        });
        const response = await changeItem({
          id: item.id,
          name,
          description,
          color: color!.value,
          state: parseInt(state!.value),
          wantedCategory: wantedCategory ? wantedCategory.map(({ value }) => value) : [],
          pictureIds,
        });
        if (response.error) toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
        else {
          toast.success(t("Item changed successfully."), { className: "!bg-green100" });
        }
        refetch();
      } catch (error) {
        toast.error(JSON.stringify(error), { className: "!bg-error" });
      }
    },
    validationSchema: editItemSchema,
  });
  const { name, color, state, wantedCategory, description, pictureIds } = values;

  console.log("pictureIds", pictureIds);

  useEffect(() => {
    if (item) {
      setFieldValue("name", item.name);
      setFieldValue("description", item.description);
      if (colors)
        setFieldValue(
          "color",
          colorOptions(colors, t).find(({ value }) => value === item.color)
        );
      setFieldValue(
        "state",
        STATE_OPTIONS.find(({ value }) => value == item.state)
      );
      if (categories)
        setFieldValue(
          "wantedCategory",
          categoriesOptions(categories, t).filter(({ value }) => item.wantedCategory.includes(value))
        );
      setFieldValue("pictureIds", item.pictureIds);
    }
  }, [item, setFieldValue, colors, categories, t]);

  return (
    <Layout>
      <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
      <h1 className='text-4xl font-semibold my-5'>{t("Edit Item")}</h1>
      <form className='space-y-5' onSubmit={handleSubmit}>
        <div className='flex below-998:flex-col gap-6'>
          <Card className='w-full space-y-6 p-8'>
            <Input
              label={
                <>
                  {t("item_name")} <span className='text-green600 text-[14px]'>({t("Required")})</span>
                </>
              }
              placeholder={t("Enter the name of your item")}
              additionalBlock={t("Enter at least 16 characters")}
              charCounter={{ withCharCounter: true, maxChars: 40 }}
              name='name'
              type='text'
              onChange={handleChange}
              onBlur={handleBlur}
              value={name}
              error={touched.name ? errors.name : undefined}
            />
            <CustomSelect
              label={
                <>
                  {t("Color")} <span className='text-green600 text-[14px]'>({t("Required")})</span>
                </>
              }
              options={colorOptions(colors, t)}
              onChange={(colors) => setFieldValue("color", colors)}
              value={color}
              error={touched.color ? errors.color : undefined}
            />
            <CustomSelect
              label={
                <>
                  {t("Wanted category")} <span className='text-green600 text-[14px]'>({t("Optional")})</span>
                </>
              }
              additionalBlock={t("All categories is chosen by default")}
              placeholder={t("All")}
              isMulti
              options={categoriesOptions(categories, t)}
              onChange={(wantedCategory) => setFieldValue("wantedCategory", wantedCategory)}
              value={wantedCategory}
              error={touched.wantedCategory && errors.wantedCategory ? errors.wantedCategory[0] : undefined}
            />
            <CustomSelect
              label={
                <>
                  {t("State")} <span className='text-green600 text-[14px]'>({t("Required")})</span>
                </>
              }
              options={STATE_OPTIONS}
              onChange={(state) => setFieldValue("state", state)}
              value={state}
              error={touched.state ? errors.state : undefined}
            />
            <Textarea
              label={
                <>
                  {t("Description")} <span className='text-green600 text-[14px]'>({t("Required")})</span>
                </>
              }
              placeholder={t("Describe your item")}
              additionalBlock={t("Enter at least 40 characters")}
              charCounter={{ withCharCounter: true, maxChars: 500 }}
              name='description'
              onChange={handleChange}
              onBlur={handleBlur}
              value={description}
              error={touched.description ? errors.description : undefined}
            />
          </Card>
          <Card className={cn("w-full py-8 px-20 tablet:px-12 mobile:!px-8 flex flex-col", { "items-center justify-center": !item })}>
            {!item ? <Loader /> : <ImageUploading setPicturesState={(value) => setFieldValue("pictureIds", value)} pictureIds={item.pictureIds} />}
          </Card>
        </div>
        <Button className='above-999:max-w-[300px] w-full' type='submit'>
          {t("Change Item")}
        </Button>
      </form>
    </Layout>
  );
};

export default withAuth(EditItemPage);
