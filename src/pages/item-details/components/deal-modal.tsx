import { useAddDealMutation, useGetMyItemsQuery } from "@/api/apiSlice";
import { ArrowsSwitchIcon } from "@/assets/icons";
import { Button, Card, Loader } from "@/components";
import useOnClickOutside from "@/hooks/useClickOutside";
import cn from "classnames";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import imagePlaceholder from "@/assets/images/placeholder-image.jpg";
import { toast } from "react-toastify";

type DealModalProps = {
  onClose: () => void;
  isOpen: boolean;
  className?: string;
  userLink: ReactNode;
  item: any;
} & HTMLAttributes<HTMLDivElement>;

export const DealModal: FC<DealModalProps> = ({ onClose, userLink, isOpen, className, item, ...rest }) => {
  const [chosenItem, setChosenItem] = useState<string>();
  const { t } = useTranslation();
  const ref = useOnClickOutside(onClose);
  const { data: myItems } = useGetMyItemsQuery();
  const [addDeal] = useAddDealMutation();

  const handleSubmit = async () => {
    if (!chosenItem) {
      toast.error(t("Please choose an item"), { className: "!bg-error" });
      return;
    }
    const response = await addDeal({ offeredItemId: chosenItem, requestedItemId: item.id });
    if (response.error) {
      toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
      return;
    }
    toast.success(t("Request sent successfully"), { className: "!bg-green100" });
    onClose();
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const ItemCard: FC<{ myItem?: boolean; item: any } & HTMLAttributes<HTMLDivElement>> = ({ myItem = false, item, ...rest }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <Card {...rest} className={cn("!p-3 flex gap-2 font-[400]", { "hover:brightness-95 cursor-pointer": myItem })}>
        <div className='relative aspect-[16/12] w-full max-w-[100px] mobile:max-w-[75px] rounded-lg overflow-hidden shrink-0'>
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
              <span className='line-clamp-1 capitalize'>{item.wantedCategory}</span>
            </p>
          ) : (
            <p className='capitalize'>
              <span className='text-green600'>{t("Category")}: </span>
              {item.category}
            </p>
          )}
        </div>
      </Card>
    );
  };

  if (isOpen)
    return (
      <div className='fixed z-20 w-full min-h-screen top-0 bg-white400/40 flex justify-center items-center'>
        <div className=' w-full max-w-[850px] mx-10 my-4' ref={ref} {...rest}>
          <Card className='!font-semibold w-full'>
            <h2 className='text-[32px] below-768:text-[24px] mb-[24px] below-768:mb-[4px] leading-none'>
              {t("New deal")}{" "}
              <span className='!text-[24px]'>
                {t("with")} {userLink}
              </span>
            </h2>
            <div className='flex gap-[24px] below-768:gap-[16px] below-768:flex-col-reverse'>
              <div className='w-full shrink-[1.1]'>
                <h3 className='mb-[16px] below-768:mb-[12px] text-[16px]'>{t("Item you want")}:</h3>
                <ItemCard item={item} />
                <div className='relative mb-[24px] mt-[32px] below-768:mb-[16px]  below-768:mt-[20px]'>
                  <ArrowsSwitchIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white100 px-2 box-content' />
                  <hr className='h-px border-none w-full bg-green400' />
                </div>
                <h3 className='mb-[16px] below-768:mb-[12px] text-[16px]'>{t("Your item")}:</h3>
                {chosenItem ? (
                  <ItemCard myItem item={myItems.list.find(({ id }: any) => id == chosenItem)} onClick={() => setChosenItem("")} />
                ) : (
                  <div className='outline-[2px] !font-[400] text-[20px] text-green600 rounded-[8px] h-[98px] mobile:h-[73px] w-full outline-green600 outline-dashed flex justify-center items-center'>
                    {t("Choose your item")}
                  </div>
                )}
              </div>
              <div className='w-full flex flex-col'>
                <h3 className='mb-[16px] below-768:mb-[12px] text-[16px]'>{t("Your items")}:</h3>
                <Card
                  className={cn("flex-1 !py-[12px] !px-0 below-768:max-h-[197px] max-h-[295px]", {
                    "flex items-center justify-center": !myItems,
                  })}>
                  <div className='overflow-auto py-1 h-full below-768:max-h-[163px] w-full space-y-[8px] px-[12px]'>
                    {!myItems ? (
                      <Loader className='size-[32px]' />
                    ) : (
                      myItems.list
                        .filter(({ id }: any) => id != chosenItem)
                        .map((item: any) => <ItemCard key={item.id} item={item} myItem onClick={() => setChosenItem(item.id)} />)
                    )}
                  </div>
                </Card>
              </div>
            </div>
            <div className='flex items-center justify-end gap-[16px] mt-[16px]'>
              <button className='hover:underline decoration-[1.5px] text-[16px]' onClick={onClose}>
                {t("Cancel")}
              </button>
              <Button type='submit' size='sm' onClick={handleSubmit} className='!text-[16px] !px-[24px] !h-[40px]'>
                {t("Send request")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
};
