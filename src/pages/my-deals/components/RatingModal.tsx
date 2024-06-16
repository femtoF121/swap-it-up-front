import { useAddDealMutation } from "@/api/apiSlice";
import { Button, Card } from "@/components";
import useOnClickOutside from "@/hooks/useClickOutside";
import { FC, HTMLAttributes, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type RatingModalProps = {
  onClose: () => void;
  isOpen: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const RatingModal: FC<RatingModalProps> = ({ onClose, isOpen, className, ...rest }) => {
  const { t } = useTranslation();
  const ref = useOnClickOutside(onClose);
  const [addDeal] = useAddDealMutation();

  const handleSubmit = async () => {
    const response = await addDeal({});
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

  if (isOpen)
    return (
      <div className='fixed z-20 w-full min-h-screen top-0 bg-white400/40 flex justify-center items-center'>
        <div className=' w-full max-w-[850px] mx-10 my-4' ref={ref} {...rest}>
          <Card className='!font-semibold w-full'>
            <div className='flex gap-[24px] below-768:gap-[16px] below-768:flex-col-reverse'>
              <div className='w-full flex flex-col'>
                <h3 className='mb-[16px] below-768:mb-[12px] text-[16px]'>{t("Your items")}:</h3>
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
