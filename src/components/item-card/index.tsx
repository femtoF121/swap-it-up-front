import cn from "classnames";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button";

interface ItemCardProps extends ComponentPropsWithoutRef<"div"> {
  img: string;
  title: string;
  category: ReactNode;
  description: string;
  wanted?: string;
}

export const ItemCard: FC<ItemCardProps> = ({ img, title, category, description, wanted = "All", className, ...rest }) => {
  return (
    <div {...rest} className={cn("flex flex-col gap-4 group cursor-pointer rounded-2xl bg-white100 shadow-card p-6 mobile:p-4", className)}>
      <img src={img} alt='item photo' className='rounded-2xl object-cover h-[225px]' />
      <div className='flex justify-between items-center gap-4 text-[24px]'>
        <Link to={""} className='group-hover:underline leading-tight'>
          {title}
        </Link>{" "}
        {category}
      </div>
      <p className='line-clamp-3'>{description}</p>
      <div className='flex-1 flex flex-col justify-end gap-4'>
        <p>
          <span className='text-green600'>Wants to exchange on:</span>
          <br />
          <span className='line-clamp-1'>{wanted}</span>
        </p>
        <hr className='h-px bg-white200 w-full' />
        <div className='w-full flex gap-4 justify-end items-center'>
          <Link to={""}>More</Link>
          <Button size='sm'>Exchange</Button>
        </div>
      </div>
    </div>
  );
};
