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
    <div {...rest} className={cn("flex flex-col gap-4 group cursor-pointer rounded-2xl bg-white100 shadow-card p-6", className)}>
      <img src={img} alt='item photo' className='rounded-2xl object-cover aspect-square max-h-[200px] below-768:max-h-[150px]' />
      <div className='flex justify-between items-start gap-4'>
        <Link to={""} className='group-hover:text-orange400 hover:no-underline leading-tight font-semibold text-[1.5rem] mobile:text-[1.25rem]'>
          {title}
        </Link>{" "}
        <div className='shrink-0 mobile:[&>*]:size-[1.5rem] [&>*]:size-[2rem]'>{category}</div>
      </div>
      <p className='line-clamp-3'>{description}</p>
      <div className='flex-1 flex flex-col justify-end gap-4'>
        <hr className='h-px bg-white200 w-full' />
        <p>
          <span className='text-green600'>Wants to exchange on:</span>
          <br />
          <span className='line-clamp-1'>{wanted}</span>
        </p>
        {false && (
          <div className='w-full flex gap-4 justify-end items-center'>
            <Link to={""}>More</Link>
            <Button size='sm'>Exchange</Button>
          </div>
        )}
      </div>
    </div>
  );
};
