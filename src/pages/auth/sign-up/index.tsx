import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../components";
import { Button, Input, Loader, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "@/helpers/validation-schemas";
import { useTranslation } from "react-i18next";
import { useAddDetailsMutation, useLoginMutation, useRegisterMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

interface ErrorResponse {
  errors: {
    [key: string]: string[];
  };
}

const SignUpPage = () => {
  const location = useLocation();
  const [step, setStep] = useState<number>(location.state?.step || 0);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [register, registerResponse] = useRegisterMutation();
  const [login, loginResponse] = useLoginMutation();
  const [addDetails] = useAddDetailsMutation();
  const { errors, touched, handleBlur, values, handleChange, handleSubmit, validateField } = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "", name: "", surname: "" },
    onSubmit: () => {},
    validationSchema: registerSchema,
  });
  const { email, password, confirmPassword, name, surname } = values;

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleFirstStep = async () => {
    if (errors.email || errors.password || errors.confirmPassword) {
      validateField("email");
      validateField("password");
      validateField("confirmPassword");
      return;
    }
    const response = await register({ email, password });
    if (response.error) {
      if ("data" in response.error) {
        const payload = response.error.data as ErrorResponse;
        let message = "";
        for (const key in payload.errors) {
          if (key !== "DuplicateUserName") message += payload.errors[key].map((value) => value).join("\n");
        }
        toast.error(message || t("Register failed"), { className: "!bg-error" });
        return;
      }
      toast.error(t("Register failed"), { className: "!bg-error" });
      return;
    }
    await login({ email, password });
    nextStep();
  };

  const handleSecondStep = async () => {
    if (errors.name || errors.surname) {
      validateField("name");
      validateField("surname");
      return;
    }
    try {
      const response = await addDetails({ name, surname });
      if (response.error) {
        toast.error(t("Adding details failed"), { className: "!bg-error" });
        return;
      }
      navigate(RoutesEnum.HOME);
    } catch (error) {
      toast.error(JSON.stringify(error), { className: "!bg-error" });
    }
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
            {(registerResponse.isLoading || loginResponse.isLoading) && <Loader className='!size-8 mt-4' />}
            <Button size='sm' className='w-full mt-6 mb-2' onClick={handleFirstStep}>
              {t("Next")}
            </Button>
            <Button size='sm' variant='secondary' className='w-full mb-4'>
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
            <Button size='sm' className='w-full mt-6 mb-2' onClick={handleSecondStep}>
              {t("Sign up")}
            </Button>
            <Button size='sm' variant='secondary' className='w-full mb-4'>
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
