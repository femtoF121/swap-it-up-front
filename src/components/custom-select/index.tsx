import cn from "classnames";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ReactSelect, { GroupBase } from "react-select";
import { PublicBaseSelectProps } from "react-select/base";

type OptionType = {
  value: string;
  label: string;
};

interface CustomSelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>>
  extends Partial<PublicBaseSelectProps<Option, IsMulti, Group>> {
  label?: ReactNode;
  className?: string;
  error?: string;
  additionalBlock?: ReactNode;
}

export function CustomSelect<IsMulti extends boolean = false, Group extends GroupBase<OptionType> = GroupBase<OptionType>>(
  props: CustomSelectProps<OptionType, IsMulti, Group>
) {
  const { t } = useTranslation();
  return (
    <div className={cn("flex flex-col max-w-[300px] gap-1", props.className)}>
      {props.label && (
        <label className='text-[16px]' htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <ReactSelect
        placeholder={t("Select an option") + "..."}
        {...props}
        name={props.name}
        options={props.options}
        className='!text-[16px]'
        classNames={{
          control: (state) => cn("!rounded-lg !shadow-none !min-h-[40px] !bg-white50", state.isFocused ? "!border-orange400" : "!border-white200"),
          option: (state) => {
            console.log(state);
            return cn("active:!bg-orange100", { "!bg-orange400": state.isSelected, "!bg-orange100": state.isFocused && !state.isSelected });
          },
        }}
      />
      {props.additionalBlock && <span className='text-white400 text-[12px] leading-none'>{props.additionalBlock}</span>}
      {props.error && <span className='text-[red] text-[12px] leading-none'>{props.error.charAt(0).toUpperCase() + props.error.slice(1)}</span>}
    </div>
  );
}
