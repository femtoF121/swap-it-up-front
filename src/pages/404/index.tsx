import { Layout, ReturnTo } from "@/components";
import { RoutesEnum } from "@/enums";
import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <Layout>
      <ReturnTo to={RoutesEnum.HOME}>return to Home page</ReturnTo>
      <div className='p-12 w-full text-center font-semibold my-4 relative bg-404 bg-cover'>
        <h1 className='text-[8rem] leading-none font-jost font-bold mb-8 text-white50 drop-shadow-lg'>404</h1>
        <h2 className='text-2xl mb-2'>Sorry, but the page you were looking for could not be found.</h2>
        <p>
          Return to the{" "}
          <Link to={RoutesEnum.HOME} className='text-orange400'>
            Home page
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Error404Page;
