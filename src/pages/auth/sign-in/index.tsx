import { Link } from "react-router-dom";
import { Layout } from "../components";
import { RoutesEnum } from "@/enums";
import { Button, Input, ReturnTo } from "@/components";

const SignInPage = () => {
  return (
    <Layout>
      <form action='' className='w-full flex flex-col items-center'>
        <h1 className='text-[40px]'>Sign In</h1>
        <ReturnTo to={RoutesEnum.HOME} className='mt-2 mb-6'>
          return to Home page
        </ReturnTo>
        <Input className='mb-4' label='Email' type='email' name='login' required />
        <Input label='Password' type='password' name='password' required />
        <Button size='sm' className='w-full mt-6 mb-2'>
          Sign in
        </Button>
        <Button size='sm' styleType='secondary' className='w-full mb-4'>
          Sign in with Google
        </Button>
        <Link to={"#"} className='underline decoration-1 mb-2'>
          Reset password
        </Link>
        <span>
          No account?{" "}
          <Link to={RoutesEnum.SIGN_UP} className='underline decoration-1 text-orange400'>
            Create one
          </Link>
        </span>
      </form>
    </Layout>
  );
};

export default SignInPage;
