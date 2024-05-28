import { LanguageSwitcher, Logo } from "@/components";
import { ComponentPropsWithoutRef, FC } from "react";

interface LayoutProps extends ComponentPropsWithoutRef<"div"> {}

export const Layout: FC<LayoutProps> = ({ children, ...rest }) => {
  return (
    <div {...rest} className='bg-login bg-cover min-h-screen flex items-center'>
      <div className='max-w-[400px] w-full mx-auto p-4 pt-1 box-content'>
        <Logo className='block text-center mb-2 !text-[3rem]' />
        <div className='rounded-2xl bg-white100 p-8 shadow-lg'>{children}</div>
      </div>
      <LanguageSwitcher highlightColor='text-white50' className='absolute bottom-5 right-5' />
    </div>
  );
};
