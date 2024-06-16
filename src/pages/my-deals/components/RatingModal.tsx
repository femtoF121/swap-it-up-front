import { useRateItemMutation } from "@/api/apiSlice";
import { Button, Card, Rating } from "@/components";
import useOnClickOutside from "@/hooks/useClickOutside";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type RatingModalProps = {
  onClose: () => void;
  isOpen: boolean;
  className?: string;
  ratedItemID: string;
} & HTMLAttributes<HTMLDivElement>;

export const RatingModal: FC<RatingModalProps> = ({ onClose, isOpen, className, ratedItemID, ...rest }) => {
  const { t } = useTranslation();
  const ref = useOnClickOutside(onClose);
  const [rate] = useRateItemMutation();
  const [stars, setStars] = useState([false, false, false, false, false]);

  const handleSubmit = async () => {
    const response = await rate({ id: ratedItemID, rate: stars.filter((v) => v).length });
    if (response.error) {
      toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
      return;
    }
    toast.success(t("User rated successfully"), { className: "!bg-green100" });
    onClose();
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (isOpen)
    return (
      <div className='fixed z-20 inset-0 top-0 bg-white400/40 !w-full flex justify-center items-center'>
        <div className=' w-full max-w-[500px] mx-10 my-4' ref={ref} {...rest}>
          <Card className='!font-semibold w-full flex flex-col items-center gap-6'>
            <Rating className='[&>*]:size-16 !text-6xl' stars={stars} setStars={setStars} />
            <Button size='sm' disabled={stars.filter((v) => v).length <= 0} onClick={handleSubmit}>
              {t("Rate user")}
            </Button>
          </Card>
        </div>
      </div>
    );
};
