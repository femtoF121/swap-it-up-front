import cn from "classnames";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../card";
import { DeleteIcon, EditIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";
import { RoutesEnum } from "@/enums";
import placeholder from "@/assets/images/placeholder-image.jpg";

interface ItemCardProps extends ComponentPropsWithoutRef<"div"> {
  img: string;
  title: string;
  category: string;
  description: string;
  wanted?: string[];
  myItem?: boolean;
  handleDelete?: () => void;
  color?: any;
}

export const ItemCard: FC<ItemCardProps> = ({
  img,
  title,
  category,
  description,
  wanted,
  myItem = false,
  className,
  id,
  color,
  handleDelete,
  ...rest
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleEdit = () => {
    navigate(RoutesEnum.EDIT_ITEM.replace(":id", id!));
  };

  const handleClickItem = () => {
    if (!myItem) navigate(RoutesEnum.ITEM.replace(":id", id!));
  };

  return (
    <Card {...rest} className={cn("flex flex-col gap-4", className, { "group cursor-pointer": !myItem })} onClick={handleClickItem}>
      <div className='relative aspect-square max-h-[200px] below-768:max-h-[150px]'>
        {!imageLoaded && <div className='skeleton-loader !rounded-2xl' />}
        <img
          src={img || placeholder}
          alt='item photo'
          className={cn("rounded-2xl object-cover aspect-square max-h-[200px] w-full below-768:max-h-[150px]", { hidden: !imageLoaded })}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className='flex gap-2 justify-between items-start'>
        <Link
          to={RoutesEnum.ITEM.replace(":id", id!)}
          className='group-hover:text-orange400 hover:text-orange400 hover:no-underline leading-tight font-semibold text-[1.5rem] mobile:text-[1.25rem]'>
          {title}
        </Link>
        <div className='flex gap-2 items-center mt-1 capitalize'>
          {color.name} <div className='rounded-full size-4 border-teal600 border' style={{ backgroundColor: color.hex }}></div>
        </div>
      </div>
      <p className='line-clamp-3'>{description}</p>
      <div className='flex-1 flex flex-col justify-end gap-4'>
        {!myItem && <hr className='h-px bg-white200 w-full' />}
        <span className='flex capitalize'>
          <span className='text-green600 '>{t("Category")}:&nbsp;</span> {t(category)}
        </span>
        <p>
          <span className='text-green600'>{t("Wants to exchange on")}:</span>
          <br />
          <span className='line-clamp-1 capitalize'>
            {wanted && wanted.length > 0 ? wanted.map((category, index) => (index < wanted.length - 1 ? `${t(category)}, ` : t(category))) : t("All")}
          </span>
        </p>
        {myItem && (
          <>
            <hr className='h-px bg-white200 w-full' />
            <div className='w-full flex gap-4 justify-between items-center mobile:flex-col-reverse'>
              <div className='flex gap-4 mobile:w-full'>
                <DeleteIcon className='size-8 hover:stroke-soft-red cursor-pointer' onClick={handleDelete} />
                <EditIcon className='size-8 hover:stroke-orange400 cursor-pointer' onClick={handleEdit} />
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
