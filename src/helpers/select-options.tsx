import { OptionType } from "@/types/option";

export const categoriesOptions = (categories: { list: { name: string }[] }, t: (key: string) => string) => {
  return categories && categories.list.map(({ name }): OptionType => ({ label: t(name)[0].toUpperCase() + t(name).slice(1), value: name }));
};

export const colorOptions = (colors: { list: { name: string; hex: string }[] }, t: (key: string) => string) => {
  return (
    colors &&
    colors.list.map(
      ({ name, hex }: { name: string; hex: string }): OptionType => ({
        label: (
          <div className='flex items-center justify-between'>
            {t(name)[0].toUpperCase() + t(name).slice(1)}
            <div style={{ backgroundColor: hex }} className='size-[16px] rounded-full outline outline-[1px] outline-white400' />
          </div>
        ),
        value: name,
      })
    )
  );
};
