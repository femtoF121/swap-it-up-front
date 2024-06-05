import { useGetInfoQuery } from "@/api/apiSlice";
import { Loader } from "@/components";
import { RoutesEnum } from "@/enums";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { data, isLoading, error } = useGetInfoQuery();

    if (isLoading)
      return (
        <div className='w-full min-h-screen flex justify-center items-center'>
          <Loader />
        </div>
      );

    if (error || !data) {
      return <Navigate to={RoutesEnum.SIGN_IN} />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
