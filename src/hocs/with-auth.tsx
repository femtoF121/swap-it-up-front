import { useGetDetailsQuery } from "@/api/apiSlice";
import { Loader } from "@/components";
import { RoutesEnum } from "@/enums";
import { Navigate } from "react-router-dom";
import { createContext } from "react";

export const UserContext = createContext<any>({});

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { data, isLoading, error } = useGetDetailsQuery();

    if (isLoading)
      return (
        <div className='w-full min-h-screen flex justify-center items-center'>
          <Loader />
        </div>
      );

    if (error || !data) {
      return <Navigate to={RoutesEnum.SIGN_IN} />;
    }

    return (
      <UserContext.Provider value={data}>
        <WrappedComponent {...props} />
      </UserContext.Provider>
    );
  };

  return ComponentWithAuth;
};

export default withAuth;
