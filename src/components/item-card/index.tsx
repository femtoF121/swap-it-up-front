import cn from "classnames";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { Card } from "../card";
import { DeleteIcon, EditIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";

interface ItemCardProps extends ComponentPropsWithoutRef<"div"> {
  img: string;
  title: string;
  category: ReactNode;
  description: string;
  wanted?: string;
  myItem?: boolean;
}

export const ItemCard: FC<ItemCardProps> = ({ img, title, category, description, wanted = "All", myItem = false, className, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Card {...rest} className={cn("flex flex-col gap-4 group cursor-pointer", className)}>
      <img src={img} alt='item photo' className='rounded-2xl object-cover aspect-square max-h-[200px] below-768:max-h-[150px]' />
      <div className='flex justify-between items-start gap-4'>
        <Link to={""} className='group-hover:text-orange400 hover:no-underline leading-tight font-semibold text-[1.5rem] mobile:text-[1.25rem]'>
          {title}
        </Link>{" "}
        <div className='shrink-0 mobile:[&>*]:size-[1.5rem] [&>*]:size-[2rem]'>{category}</div>
      </div>
      <p className='line-clamp-3'>{description}</p>
      <div className='flex-1 flex flex-col justify-end gap-4'>
        {!myItem && <hr className='h-px bg-white200 w-full' />}
        <p>
          <span className='text-green600'>{t("Wants to exchange on")}:</span>
          <br />
          <span className='line-clamp-1'>{wanted}</span>
        </p>
        {myItem && (
          <>
            <hr className='h-px bg-white200 w-full' />
            <div className='w-full flex gap-4 justify-between items-center'>
              <div className='flex gap-2'>
                <DeleteIcon /> <EditIcon />
              </div>
              <Button size='sm'>Exchange</Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
