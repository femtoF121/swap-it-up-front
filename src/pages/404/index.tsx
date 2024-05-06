import { ArrowLeftIcon } from "@/assets/icons";
import { RoutesEnum } from "@/enums";
import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <main>
      <Link className='flex gap-2 items-center text-teal600' to={RoutesEnum.HOME}>
        <ArrowLeftIcon />
        <p>return to Home page</p>
      </Link>
      <div className='p-12 bg-green400 w-full text-center text-teal600 font-semibold my-4'>
        <h1 className='text-[128px] leading-none font-jost font-bold mb-8 text-white50 drop-shadow-lg'>404</h1>
        <h2 className='text-2xl mb-2'>Sorry, but the page you were looking for could not be found.</h2>
        <p>
          Return to the{" "}
          <Link to={RoutesEnum.HOME} className='text-orange400'>
            Home page
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Error404Page;
