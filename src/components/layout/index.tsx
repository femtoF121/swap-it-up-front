import { FC, HTMLAttributes } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import cn from "classnames";

type LayoutProps = {
  withAuth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Layout: FC<LayoutProps> = ({ withAuth, children, className }) => {
  return (
    <div className={cn(className, "home-container flex flex-col min-h-screen gap-8")}>
      <Header withAuth={withAuth} />
      <main className='flex-1'>{children}</main>
      <Footer withAuth={withAuth} />
    </div>
  );
};
