import { FC, HTMLAttributes, useEffect, useState } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import cn from "classnames";
import { useGetDetailsQuery, useGetInfoQuery } from "@/api/apiSlice";
import { useLocation } from "react-router-dom";
import { ADMIN_CREDS } from "@/constants/admin";

type LayoutProps = {
  withAuth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Layout: FC<LayoutProps> = ({ children, className }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const { data, isLoading, isSuccess, refetch } = useGetDetailsQuery();
  const { data: userInfo, refetch: userRefetch } = useGetInfoQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location]);

  useEffect(() => {
    if (userInfo) {
      setIsAdmin(userInfo.email === ADMIN_CREDS.email);
    }
    userRefetch();
  }, [userInfo, setIsAdmin]);

  return (
    <div className='home-container relative overflow-hidden flex flex-col min-h-screen gap-8'>
      <Header isAdmin={isAdmin} withAuth={isSuccess} name={data?.name} isLoading={isLoading} />
      <main className={cn("flex-1", className)}>{children}</main>
      <Footer isAdmin={isAdmin} withAuth={isSuccess} />
    </div>
  );
};
