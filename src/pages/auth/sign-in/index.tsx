import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../components";
import { RoutesEnum } from "@/enums";
import { Button, Input, Loader, ReturnTo } from "@/components";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { loginSchema } from "@/helpers/validation-schemas";
import { toast } from "react-toastify";
import { useLazyGetDetailsQuery, useLoginMutation } from "@/api/apiSlice";

const SignInPage = () => {
  const [getDetails] = useLazyGetDetailsQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { errors, touched, handleBlur, values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async () => {
      try {
        const loginResp = await login({ email, password });
        if (loginResp.error) {
          toast.error(t("Wrong credentials"), { className: "!bg-error" });
          return;
        }
        const detailsResponse = await getDetails();
        if (detailsResponse.isError) {
          navigate(RoutesEnum.SIGN_UP, { state: { step: 1 } });
          return;
        }
        navigate(RoutesEnum.HOME);
      } catch (error) {
        toast.error(JSON.stringify(error), { className: "!bg-error" });
      }
    },
    validationSchema: loginSchema,
  });
  const { email, password } = values;

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
          <h1 className='text-[2.5rem]'>{t("Sign In")}</h1>
          <ReturnTo to={RoutesEnum.HOME} className='mt-2 mb-6'>
            {t("return to Home page")}
          </ReturnTo>
          <Input
            className='mb-4'
            label={t("Email")}
            type='email'
            name='email'
            onChange={handleChange}
            onBlur={handleBlur}
            value={email}
            error={touched.email ? errors.email : undefined}
          />
          <Input
            label={t("Password")}
            type='password'
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={password}
            error={touched.password ? errors.password : undefined}
          />
          {isLoading && <Loader className='!size-8 mt-6' />}
          <Button size='sm' className='w-full mt-6 mb-2' type='submit'>
            {t("Sign in")}
          </Button>
          <span>
            {t("No account?")}{" "}
            <Link to={RoutesEnum.SIGN_UP} className='underline decoration-1 text-orange400'>
              {t("Create one")}
            </Link>
          </span>
        </form>
      </Layout>
    </>
  );
};

export default SignInPage;
