import { useAddColorMutation, useDeleteColorMutation, useGetColorsQuery } from "@/api/apiSlice";
import { PlusIcon } from "@/assets/icons";
import { Button, Card, Input, Loader } from "@/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import cn from "classnames";

export const ColorsForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [hex, setHex] = useState("");
  const [hexError, setHexError] = useState("");
  const [addColor] = useAddColorMutation();
  const [deleteColor] = useDeleteColorMutation();
  const { data: colors, isLoading, refetch } = useGetColorsQuery();

  const handleAddColor = async () => {
    setName("");
    setHex("");
    if (!name) {
      setNameError(t("Name is required"));
    }
    if (!hex) {
      setHexError(t("Hex is required"));
    }
    if (!name || !hex) return;
    const response = await addColor({ name, hex });
    console.log(response);
    if (response.error) toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
    refetch();
  };

  const handleDeleteColor = async (ColorName: string) => {
    const response = await deleteColor(ColorName);
    if (response.error) toast.error(t("Something went wrong, try again later."), { className: "!bg-error" });
    refetch();
  };

  return (
    <Card>
      <h2 className='text-3xl font-semibold mb-6'>{t("Colors")}</h2>
      <div className='flex gap-8 flex-col'>
        <div className='flex items-end gap-4 max-w-[560px] w-full'>
          <Input
            label={t("Color name")}
            name='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value !== "") setNameError("");
            }}
            className={cn({ "mb-[16px]": hexError && !nameError })}
            error={nameError && nameError}
          />
          <Input
            label={t("Color hex")}
            name='name'
            value={hex}
            onChange={(e) => {
              setHex(e.target.value);
              if (e.target.value !== "") setHexError("");
            }}
            className={cn({ "mb-[16px]": nameError && !hexError })}
            error={hexError && hexError}
          />
          <Button
            variant='secondary'
            size='sm'
            className={cn("!px-[8px] !h-[40px] !transition", { "mb-[16px]": nameError || hexError })}
            onClick={handleAddColor}>
            <PlusIcon className='size-[24px]' />
          </Button>
        </div>
        <div className='flex flex-col gap-4'>
          <h3 className='text-[16px]'>{t("Existing categories")}:</h3>
          {isLoading ? (
            <Loader className='size-8' />
          ) : (
            <div className='flex gap-4 flex-wrap min-w-[300px]'>
              {colors.list.map(({ name, hex }: any, index: number) => (
                <div
                  key={index}
                  className='flex text-[16px] gap-2 items-center border border-white200 rounded-lg h-[40px] p-3 pr-1 bg-white50 leading-none w-fit'>
                  {name}
                  <div className='size-[16px] rounded-full outline outline-teal600 outline-[1px]' style={{ backgroundColor: hex }} />
                  <PlusIcon
                    className='size-5 rotate-45 hover:stroke-soft-red p-1 box-content cursor-pointer'
                    onClick={() => handleDeleteColor(name)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
