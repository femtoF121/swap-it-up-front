import { Link } from "react-router-dom";
import { Layout } from "../components";
import { RoutesEnum } from "@/enums";
import { Button, Input, ReturnTo } from "@/components";
import { useLazyGetInfoQuery, useLoginMutation } from "@/api/apiSlice";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { loginSchema } from "@/helpers/validation-schemas";

const SignInPage = () => {
  const [login] = useLoginMutation();
  const [getUserDetails, { data, isLoading, isSuccess, isError, error }, resultUserDetails] = useLazyGetInfoQuery();
  const { t } = useTranslation();
  const { errors, touched, handleBlur, values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      console.log("sent values", values);
      try {
        await login({ email, password });
        const pay = await getUserDetails();
        console.log("result", resultUserDetails);
        if (isSuccess) console.log("success", data);
        else console.log("not success", pay);
      } catch (error) {
        console.error("rejected", error);
      }
    },
    validationSchema: loginSchema,
  });
  const { email, password } = values;

  return (
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
        <Button size='sm' className='w-full mt-6 mb-2' type='submit'>
          {t("Sign in")}
        </Button>
        <Button size='sm' variant='secondary' type='button' className='w-full mb-4'>
          {t("Sign in with Google")}
        </Button>
        <Link to={"#"} className='underline decoration-1 mb-2'>
          {t("Reset password")}
        </Link>
        <span>
          {t("No account?")}{" "}
          <Link to={RoutesEnum.SIGN_UP} className='underline decoration-1 text-orange400'>
            {t("Create one")}
          </Link>
        </span>
      </form>
    </Layout>
  );
};

export default SignInPage;
