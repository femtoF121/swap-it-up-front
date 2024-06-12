import cn from "classnames";
import { FC, HTMLAttributes, useState } from "react";
import { ItemPayload } from "@/types/item";
import imagePlaceholder from "@/assets/images/placeholder-image.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RoutesEnum } from "@/enums";
import { Card } from "@/components";

type ItemCardProps = {
  item: ItemPayload;
  myItem?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const ItemCard: FC<ItemCardProps> = ({ item, myItem = false }) => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card
      className={cn("!p-3 flex gap-2 font-[400] hover:brightness-95 cursor-pointer")}
      onClick={() => navigate(RoutesEnum.ITEM.replace(":id", item.id))}>
      <div className='relative aspect-[16/12] w-full max-w-[100px] mobile:max-w-[75px] rounded-lg overflow-hidden shrink-0hover:brightness-95 cursor-pointer'>
        {!loaded && <div className='skeleton-loader !rounded-none' />}
        <img
          src={item.pictureIds[0] ? import.meta.env.VITE_SERVER_URL + "/items/pictures/" + item.pictureIds[0] : imagePlaceholder}
          alt='wanted item photo'
          className={cn("w-full h-full object-cover", { hidden: !loaded })}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className='text-[12px]'>
        <h4 className='line-clamp-1 break-all text-[16px] mb-2'>{t(item.name)}</h4>
        {!myItem ? (
          <p>
            <span className='text-green600'>{t("Wants to exchange on")}:</span>
            <br />
            <span className='line-clamp-1'>{item.wantedCategory}</span>
          </p>
        ) : (
          <p>
            <span className='text-green600'>{t("Category")}: </span>
            {item.category}
          </p>
        )}
      </div>
    </Card>
  );
};
