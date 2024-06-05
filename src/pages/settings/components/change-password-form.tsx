import { useChangePasswordMutation } from "@/api/apiSlice";
import { Button, Card, Input } from "@/components";
import { changePasswordSchema } from "@/helpers/validation-schemas";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface ErrorResponse {
  errors: {
    [key: string]: string[];
  };
}

export const ChangePasswordForm = () => {
  const { t } = useTranslation();
  const [changePassword] = useChangePasswordMutation();
  const { values, handleChange, handleSubmit, handleBlur, touched, errors, resetForm } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async () => {
      try {
        const response = await changePassword({ newPassword, oldPassword: currentPassword });
        if (response.error) {
          if ("data" in response.error) {
            const payload = response.error.data as ErrorResponse;
            let message = "";
            for (const key in payload.errors) {
              message += payload.errors[key].map((value) => value).join("\n");
            }
            toast.error(t(message) || t("Something went wrong, try again later."), { className: "!bg-error" });
          }
        } else {
          toast.success(t("Password changed successfully"), { className: "!bg-green100" });
          resetForm();
        }
      } catch (error) {
        toast.error(JSON.stringify(error), { className: "!bg-error" });
      }
    },
    validationSchema: changePasswordSchema,
  });
  const { currentPassword, newPassword } = values;

  return (
    <Card className='w-full'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-wrap gap-6 items-center'>
          <h2 className='text-2xl'>{t("Change password")}</h2>
          <Button size='sm' className='px-10' type='submit' disabled={!!errors.currentPassword || !!errors.newPassword}>
            {t("Save")}
          </Button>
        </div>
        <hr className='h-px border-0 bg-white200 w-full my-6' />
        <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-4'>
          <Input
            label={t("Current password")}
            name='currentPassword'
            type='password'
            value={currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.currentPassword ? errors.currentPassword : undefined}
          />
          <Input
            label={t("New password")}
            name='newPassword'
            type='password'
            value={newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.newPassword ? errors.newPassword : undefined}
          />
          <div className='invisible' />
        </div>
      </form>
    </Card>
  );
};
