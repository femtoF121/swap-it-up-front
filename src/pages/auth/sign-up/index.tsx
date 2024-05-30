import { Link } from "react-router-dom";
import { Layout } from "../components";
import { Button, Input, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "@/helpers/validation-schemas";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const { errors, touched, handleBlur, values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "", name: "", surname: "" },
    onSubmit: async (values) => {
      console.log(values);
    },
    validationSchema: registerSchema,
  });
  const { email, password, confirmPassword, name, surname } = values;

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
        <h1 className='text-[2.5rem]'>{t("Sign Up")}</h1>
        {step === 0 && (
          <>
            <ReturnTo to={RoutesEnum.HOME} className='mt-2 mb-4'>
              {t("return to Home page")}
            </ReturnTo>
            <span className='text-teal600 font-semibold mb-4'>{t("Please fill in all of the fields")}.</span>
            <Input
              label={t("Email")}
              type='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={email}
              error={touched.email ? errors.email : undefined}
            />
            <Input
              className='my-4'
              label={t("Password")}
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={password}
              error={touched.password ? errors.password : undefined}
            />
            <Input
              label={t("Confirm password")}
              type='password'
              name='confirmPassword'
              onChange={handleChange}
              onBlur={handleBlur}
              value={confirmPassword}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />
            <Button
              size='sm'
              className='w-full mt-6 mb-2'
              type='button'
              onClick={nextStep}
              disabled={!!errors.email || !!errors.password || !!errors.confirmPassword || Object.keys(touched).length <= 0}>
              {t("Next")}
            </Button>
            <Button size='sm' variant='secondary' type='button' className='w-full mb-4'>
              {t("Sign up with Google")}
            </Button>
            <span>
              {t("Have an account")}?{" "}
              <Link to={RoutesEnum.SIGN_IN} className='underline decoration-1 text-orange400'>
                {t("Sign in")}
              </Link>
            </span>
          </>
        )}
        {step === 1 && (
          <>
            <ReturnTo to={""} onClick={prevStep} className='mt-2 mb-4'>
              {t("return to previous step")}
            </ReturnTo>
            <span className='text-teal600 font-semibold mb-4'>{t("Please fill in all of the fields")}.</span>
            <Input
              label={t("Name")}
              type='text'
              name='name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={name}
              error={touched.name ? errors.name : undefined}
            />
            <Input
              className='mt-4'
              label={t("Surname")}
              type='text'
              name='surname'
              onChange={handleChange}
              onBlur={handleBlur}
              value={surname}
              error={touched.surname ? errors.surname : undefined}
            />
            <Button
              size='sm'
              className='w-full mt-6 mb-2'
              type='submit'
              disabled={Object.keys(touched).length <= 0 || !!errors.name || !!errors.surname}>
              {t("Sign up")}
            </Button>
            <Button size='sm' variant='secondary' type='button' className='w-full mb-4'>
              {t("Sign up with Google")}
            </Button>
            <span>
              {t("Have an account")}?{" "}
              <Link to={RoutesEnum.SIGN_IN} className='underline decoration-1 text-orange400'>
                {t("Sign in")}
              </Link>
            </span>
          </>
        )}
      </form>
    </Layout>
  );
};

export default SignUpPage;
