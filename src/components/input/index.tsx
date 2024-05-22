import { EyeIcon, EyeSlashIcon } from "@/assets/icons";
import cn from "classnames";
import { ComponentPropsWithoutRef, FC, useState } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  inputClassName?: string;
}

export const Input: FC<InputProps> = ({ label, name, className, inputClassName, type, ...rest }) => {
  const [viewPassword, setViewPassword] = useState(false);

  const toggleViewPassword = () => setViewPassword((prev) => !prev);

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
        <div className={cn("absolute right-0 cursor-pointer p-2", label ? "top-7" : "top-0")} onClick={toggleViewPassword}>
          {viewPassword ? <EyeSlashIcon className='text-white200 size-6' /> : <EyeIcon className='text-white200 size-6' />}
        </div>
      )}
    </div>
  );
};
