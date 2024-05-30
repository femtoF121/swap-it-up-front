import cn from "classnames";
import { FC, ReactNode, TextareaHTMLAttributes, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  inputClassName?: string;
  error?: string;
  additionalBlock?: string;
  charCounter?: { withCharCounter: boolean; maxChars: number };
}

export const Textarea: FC<TextareaProps> = ({ label, name, error, additionalBlock, charCounter, className, onChange, inputClassName, ...rest }) => {
  const [valueLength, setValueLength] = useState(0);

  return (
    <div className={cn("flex flex-col w-full gap-1 relative", className)}>
      {label && (
        <label className='text-[16px]' htmlFor={name}>
          {label}
        </label>
      )}
      <div className='relative h-full'>
        <textarea
          {...rest}
          rows={5}
          id={name}
          name={name}
          className={cn(
            "max-h-[320px] w-full text-[16px] min-h-[40px] pt-2 pb-1 rounded-lg hover:brightness-[98%] border border-white200 bg-white50 px-3 focus:border-orange400 focus-visible:outline-none",
            inputClassName
          )}
          onChange={(e) => {
            setValueLength(e.target.value.length);
            if (onChange) onChange(e);
          }}
        />
        {charCounter?.withCharCounter && (
          <div className={cn("absolute right-0 bottom-[-12px] text-[12px]", valueLength > charCounter.maxChars ? "text-[red]" : "text-white400")}>
            {valueLength}/{charCounter.maxChars}
          </div>
        )}
      </div>
      {additionalBlock && <span className='text-white400 text-[12px] leading-none -mt-1.5'>{additionalBlock}</span>}
      {error && <span className='text-[red] text-[12px] leading-none'>{error.charAt(0).toUpperCase() + error.slice(1)}</span>}
    </div>
  );
};
