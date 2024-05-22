import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { Logo } from "../logo";
import { Link } from "react-router-dom";
import { RoutesEnum } from "@/enums";
import { Button } from "../button";

type FooterProps = {
  withAuth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Footer: FC<FooterProps> = ({ className, withAuth, ...rest }) => {
  return (
    <footer className={classNames("py-8", className)} {...rest}>
      <div className='flex justify-between'>
        <div>
          <Logo className='text-[24px] !text-teal600' />
          {withAuth ? (
            <>
              <div className='flex gap-4 mb-2 mt-4 flex-wrap'>
                <Link to={RoutesEnum.ACCOUNT}>Account</Link>
                <Link to={RoutesEnum.CHATS}>Chat</Link>
                <Link to={RoutesEnum.ADD_ITEM} className='text-orange400'>
                  Add item
                </Link>
                <Link to={RoutesEnum.SIGN_IN}>Log out</Link>
              </div>
              <div className='text-white400 flex flex-col gap-2'>
                <Link to={RoutesEnum.MY_DEALS}>My deals</Link>
                <Link to={RoutesEnum.MY_ITEMS}>My items</Link>
                <Link to={RoutesEnum.ACCOUNT}>Settings</Link>
              </div>
            </>
          ) : (
            <div className='flex gap-4 text-white200 mb-2 mt-4 '>
              <Link to={RoutesEnum.SIGN_UP} className='text-orange400'>
                Sign Up
              </Link>
              <span>
                Have an account?&nbsp;
                <Link to={RoutesEnum.SIGN_IN} className='text-orange400'>
                  Sign In
                </Link>
              </span>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2 items-end text-white200'>
          Like to use mobile version?{" "}
          <Button size='sm' styleType='secondary' className='!py-2' voluminous>
            Get our app
          </Button>
        </div>
      </div>
      <hr className='w-full h-px bg-white200 border-0 my-4' />
      <p className='text-white200 text-[12px]'>© 2024 Swap It Up</p>
    </footer>
  );
};
