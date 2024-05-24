import { FC, HTMLAttributes } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import cn from "classnames";

type LayoutProps = {
  withAuth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Layout: FC<LayoutProps> = ({ withAuth, children, className }) => {
  return (
    <div className='home-container relative overflow-hidden flex flex-col min-h-screen gap-8'>
      <Header withAuth={withAuth} />
      <main className={cn("flex-1", className)}>{children}</main>
      <Footer withAuth={withAuth} />
    </div>
  );
};
