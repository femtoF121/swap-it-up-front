import { FC, HTMLAttributes, useEffect } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import cn from "classnames";
import { useGetDetailsQuery } from "@/api/apiSlice";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  withAuth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Layout: FC<LayoutProps> = ({ children, className }) => {
  const { data, isLoading, isSuccess, refetch } = useGetDetailsQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <div className='home-container relative overflow-hidden flex flex-col min-h-screen gap-8'>
      <Header withAuth={isSuccess} name={data?.name} isLoading={isLoading} />
      <main className={cn("flex-1", className)}>{children}</main>
      <Footer withAuth={isSuccess} />
    </div>
  );
};
