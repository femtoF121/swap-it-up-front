import { Loader } from "@/components";
import { FC, Suspense } from "react";
import { ScrollRestoration } from "react-router-dom";

interface RouteProps {
  component: FC;
}

export const Route: FC<RouteProps> = ({ component: Component }) => {
  return (
    <Suspense
      fallback={
        <div className='flex h-svh items-center justify-center'>
          <Loader />
        </div>
      }>
      <Component />
      <ScrollRestoration />
    </Suspense>
  );
};
