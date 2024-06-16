import { useAcceptDealMutation, useCancelDealMutation, useDeleteDealMutation, useFinishDealMutation, useGetUserDetailsQuery } from "@/api/apiSlice";
import { ArrowsSwitchIcon } from "@/assets/icons";
import { Button, Card, Loader, UserLink } from "@/components";
import { ItemPayload } from "@/types/item";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ItemCard } from "./ItemCard";
import { toast } from "react-toastify";
import cn from "classnames";
import { RatingModal } from "./RatingModal";

type DealCardProps = {
  offered: ItemPayload;
  requested: ItemPayload;
  myDeal?: boolean;
  incoming?: boolean;
  status: 0 | 1 | 2 | 4;
  refetch: any;
} & React.HTMLAttributes<HTMLDivElement>;

export const DealCard: FC<DealCardProps> = ({ offered, requested, myDeal, incoming = false, status, id, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const {
    data: anotherUserData,
    isLoading: isAnotherUserLoading,
    refetch: userRefetch,
  } = useGetUserDetailsQuery(myDeal ? requested.userId : offered.userId);
  const [declineDeal] = useDeleteDealMutation();
  const [acceptDeal] = useAcceptDealMutation();
  const [cancelDeal] = useCancelDealMutation();
  const [finishDeal] = useFinishDealMutation();

  const handleDeclineDeal = async () => {
    const response = await declineDeal(id);
    if (response.error) {
      toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
      return;
    }
    toast.success(t("Deal deleted"), { className: "!bg-green100" });
    userRefetch();
    refetch();
  };

  const handleAcceptDeal = async () => {
    const response = await acceptDeal(id);
    if (response.error) {
      toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
      return;
    }
    toast.success(t("Deal accepted"), { className: "!bg-green100" });
    userRefetch();
    refetch();
  };

  const handleCancelDeal = async () => {
    const response = await cancelDeal(id);
    if (response.error) {
      toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
      return;
    }
    toast.success(t("Deal canceled"), { className: "!bg-green100" });
    refetch();
    userRefetch();
  };

  const handleFinishDeal = async () => {
    const response = await finishDeal(id);
    if (response.error) {
      toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
      return;
    }
    toast.success(t("Deal finished"), { className: "!bg-green100" });
    refetch();
    userRefetch();
    setIsModalOpen(true);
  };

  return (
    <Card className='!font-semibold w-full'>
      {isAnotherUserLoading ? (
        <Loader />
      ) : (
        <>
          <div className={cn("flex gap-4 w-full", anotherUserData ? "justify-between" : "justify-end")}>
            {anotherUserData && (
              <h2 className='text-[24px] below-768:text-[24px] mb-[24px] below-768:mb-[4px] leading-none'>
                {t("Deal")} {t("with")} <UserLink user={anotherUserData} />
              </h2>
            )}
            <div>
              {t("Status")}:&nbsp;
              {status === 0 ? (
                <span className='text-orange400'>{t("Requested")}</span>
              ) : status === 1 ? (
                <span className='text-green600'>{t("Started")}</span>
              ) : status === 2 ? (
                <span className='text-soft-red'>{t("Canceled")}</span>
              ) : status === 4 ? (
                <span className='text-teal400'>{t("Finished")}</span>
              ) : (
                "..."
              )}
            </div>
          </div>
          <div className='w-full shrink-[1.1]'>
            <h3 className='mb-[16px] below-768:mb-[12px] text-[16px]'>
              {t("Item of user")}&nbsp;
              <UserLink user={anotherUserData} withRating={false} />:
            </h3>
            <ItemCard item={myDeal ? requested : offered} />
            <div className='relative mb-[24px] mt-[32px] below-768:mb-[16px]  below-768:mt-[20px]'>
              <ArrowsSwitchIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white100 px-2 box-content' />
              <hr className='h-px border-none w-full bg-green400' />
            </div>
            <h3 className='mb-[16px] below-768:mb-[12px] text-[16px]'>{t("Your item")}:</h3>
            <ItemCard myItem item={myDeal ? offered : requested} />
          </div>
          <div className='flex items-center justify-end gap-[16px] mt-[16px]'>
            {incoming && status === 0 && (
              <>
                <Button variant='secondary' size='sm' className='!text-[16px] !px-[24px] !h-[40px]' onClick={handleDeclineDeal}>
                  {t("Decline")}
                </Button>
                <Button size='sm' className='!text-[16px] !px-[24px] !h-[40px]' onClick={handleAcceptDeal}>
                  {t("Accept")}
                </Button>
              </>
            )}
            {status === 1 && (
              <>
                <Button variant='secondary' size='sm' className='!text-[16px] !px-[24px] !h-[40px]' onClick={handleCancelDeal}>
                  {t("Cancel")}
                </Button>
                <Button size='sm' className='!text-[16px] !px-[24px] !h-[40px]' onClick={handleFinishDeal}>
                  {t("Finish")}
                </Button>
              </>
            )}
            {((status === 0 && !incoming) || status === 2 || status === 4) && (
              <Button variant='secondary' size='sm' className='!text-[16px] !px-[24px] !h-[40px]' onClick={handleDeclineDeal}>
                {t("Delete")}
              </Button>
            )}
            {status === 4 && myDeal
              ? requested.rate === 0
              : offered.rate === 0 && (
                  <Button size='sm' onClick={() => setIsModalOpen(true)}>
                    {t("Rate user")}
                  </Button>
                )}
          </div>
        </>
      )}
      <RatingModal ratedItemID={myDeal ? requested.id : offered.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};
