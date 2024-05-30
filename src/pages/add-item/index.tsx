import { Button, Card, CustomSelect, Input, Layout, ReturnTo, Textarea } from "@/components";
import { CATEGORY_OPTIONS, COLOR_OPTIONS, STATE_OPTIONS } from "@/constants/select-options";
import { RoutesEnum } from "@/enums";
import { addItemSchema } from "@/helpers/validation-schemas";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ImageUploading } from "./components/image-uploading";

const AddItemPage = () => {
  const { t } = useTranslation();
  const { errors, touched, handleBlur, values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      category: undefined,
      color: undefined,
      state: undefined,
      wantedCategories: undefined,
      description: "",
      pictures: [],
    },
    onSubmit: async (values) => {
      console.log("sent values", values);
      try {
      } catch (error) {
        console.error("rejected", error);
      }
    },
    validationSchema: addItemSchema,
  });

  console.log(values.pictures);

  return (
    <Layout withAuth>
      <ReturnTo to={RoutesEnum.HOME}>{t("return to Home page")}</ReturnTo>
      <h1 className='text-4xl font-semibold my-5'>Add Item</h1>
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
              additionalBlock={t("Enter at least 10 characters")}
              charCounter={{ withCharCounter: true, maxChars: 40 }}
              name='name'
              type='text'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={touched.name ? errors.name : undefined}
            />
            <CustomSelect
              label={
                <>
                  {t("Category")} <span className='text-green600 text-[14px]'>({t("Required")})</span>
                </>
              }
              options={CATEGORY_OPTIONS}
              onChange={(category) => setFieldValue("category", category)}
              value={values.category}
              error={touched.category ? errors.category : undefined}
            />
            <CustomSelect
              label={
                <>
                  {t("Color")} <span className='text-green600 text-[14px]'>({t("Required")})</span>
                </>
              }
              options={COLOR_OPTIONS}
              onChange={(colors) => setFieldValue("color", colors)}
              value={values.color}
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
              options={CATEGORY_OPTIONS}
              onChange={(wantedCategories) => setFieldValue("wantedCategories", wantedCategories)}
              value={values.wantedCategories}
              error={touched.wantedCategories && errors.wantedCategories ? errors.wantedCategories[0] : undefined}
            />
            <CustomSelect
              label={
                <>
                  {t("State")} <span className='text-green600 text-[14px]'>({t("Required")})</span>
                </>
              }
              options={STATE_OPTIONS}
              onChange={(state) => setFieldValue("state", state)}
              value={values.state}
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
              value={values.description}
              error={touched.description ? errors.description : undefined}
            />
          </Card>
          <Card className='w-full py-8 px-20 tablet:px-12 mobile:!px-8 flex flex-col'>
            <ImageUploading setPicturesState={(value) => setFieldValue("pictures", value)} />
          </Card>
        </div>
        <Button className='above-999:max-w-[300px] w-full' type='submit'>
          {t("Post Item")}
        </Button>
      </form>
    </Layout>
  );
};

export default AddItemPage;
