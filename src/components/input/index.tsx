import { EyeIcon, EyeSlashIcon } from "@/assets/icons";
import cn from "classnames";
import { FC, InputHTMLAttributes, ReactNode, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  inputClassName?: string;
  error?: string;
  additionalBlock?: string;
  charCounter?: { withCharCounter: boolean; maxChars: number };
}

export const Input: FC<InputProps> = ({ label, name, error, className, additionalBlock, charCounter, inputClassName, onChange, type, ...rest }) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [valueLength, setValueLength] = useState(0);

  const toggleViewPassword = () => setViewPassword((prev) => !prev);

  return (
    <div className={cn("flex flex-col w-full gap-1 relative", className)}>
      {label && (
        <label className='text-[16px]' htmlFor={name}>
          {label}
        </label>
      )}
      <div className='relative h-full'>
        <input
          {...rest}
          type={type === "password" ? (viewPassword ? "text" : "password") : type}
          id={name}
          name={name}
          size={1}
          className={cn(
            "h-[40px] rounded-lg hover:brightness-[98%] text-[16px] w-full border border-white200 bg-white50 px-3 focus:border-orange400 focus-visible:outline-none",
            inputClassName
          )}
          onChange={(e) => {
            setValueLength(e.target.value.length);
            if (onChange) onChange(e);
          }}
        />
        {charCounter?.withCharCounter && (
          <div className={cn("absolute right-0 bottom-[-20px] text-[12px]", valueLength > charCounter.maxChars ? "text-[red]" : "text-white400")}>
            {valueLength}/{charCounter.maxChars}
          </div>
        )}
      </div>
      {additionalBlock && <span className='text-white400 text-[12px] leading-none'>{additionalBlock}</span>}
      {error && <span className='text-[red] text-[12px] leading-none'>{error.charAt(0).toUpperCase() + error.slice(1)}</span>}
      {type === "password" && (
        <div className={cn("absolute right-0 cursor-pointer p-2", label ? "top-7" : "top-0")} onClick={toggleViewPassword}>
          {viewPassword ? <EyeSlashIcon className='text-white200 size-6' /> : <EyeIcon className='text-white200 size-6' />}
        </div>
      )}
    </div>
  );
};
