import { EyeIcon, EyeSlashIcon } from "@/assets/icons";
import cn from "classnames";
import { ComponentPropsWithoutRef, FC, useState } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  inputClassName?: string;
}

export const Input: FC<InputProps> = ({ label, name, className, inputClassName, type, ...rest }) => {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <div className={cn("flex flex-col w-full gap-1 relative", className)}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        type={type === "password" ? (viewPassword ? "text" : "password") : type}
        id={name}
        name={name}
        className={cn("h-[40px] rounded-lg border border-white200 bg-white50 px-3", inputClassName)}
      />
      {type === "password" && (
        <div
          className={cn("absolute right-2 cursor-pointer", label ? "top-9" : "top-2")}
          onMouseDown={() => setViewPassword(true)}
          onMouseUp={() => setViewPassword(false)}>
          {viewPassword ? <EyeSlashIcon className='text-white200 size-6' /> : <EyeIcon className='text-white200 size-6' />}
        </div>
      )}
    </div>
  );
};
