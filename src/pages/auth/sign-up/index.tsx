import { Link } from "react-router-dom";
import { Layout } from "../components";
import { Button, Input, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { useState } from "react";

const SignUpPage = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <Layout>
      <form action='' className='w-full flex flex-col items-center'>
        <h1 className='text-[40px]'>Sign Up</h1>
        {step === 0 && (
          <>
            <ReturnTo to={RoutesEnum.HOME} className='mt-2 mb-4'>
              return to Home page
            </ReturnTo>
            <span className='text-orange400 mb-4'>Please fill in all of the fields.</span>
            <Input label='Email' type='email' name='login' required />
            <Input className='my-4' label='Password' type='text' name='password' required />
            <Input label='Confirm password' type='text' name='password' required />
            <Button size='sm' className='w-full mt-6 mb-2' onClick={nextStep}>
              Next
            </Button>
            <Button size='sm' styleType='secondary' className='w-full mb-4'>
              Sign up with Google
            </Button>
            <span>
              Have an account?{" "}
              <Link to={RoutesEnum.SIGN_IN} className='underline decoration-1 text-orange400'>
                Sign in
              </Link>
            </span>
          </>
        )}
        {step === 1 && (
          <>
            <ReturnTo to={""} onClick={prevStep} className='mt-2 mb-4'>
              return to previous step
            </ReturnTo>
            <span className='text-orange400 mb-4'>Please fill in all of the fields.</span>
            <Input label='Name' type='text' name='name' required />
            <Input className='mt-4' label='Surname' type='text' name='surname' required />
            <Button size='sm' className='w-full mt-6 mb-2'>
              Sign up
            </Button>
            <Button size='sm' styleType='secondary' className='w-full mb-4'>
              Sign up with Google
            </Button>
            <span>
              Have an account?{" "}
              <Link to={RoutesEnum.SIGN_IN} className='underline decoration-1 text-orange400'>
                Sign in
              </Link>
            </span>
          </>
        )}
      </form>
    </Layout>
  );
};

export default SignUpPage;
