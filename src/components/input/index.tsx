import { EyeIcon, EyeSlashIcon } from "@/assets/icons";
import cn from "classnames";
import { FC, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({ label, name, error, className, inputClassName, type, ...rest }) => {
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
        size={1}
        className={cn(
          "h-[2.5rem] rounded-lg hover:brightness-[98%] border border-white200 bg-white50 px-3 focus:border-orange400 focus-visible:outline-none",
          inputClassName
        )}
      />
      {error && <span className='text-[red] text-[12px] leading-none -mt-0.5'>{error.charAt(0).toUpperCase() + error.slice(1)}</span>}
      {type === "password" && (
        <div className={cn("absolute right-0 cursor-pointer p-2", label ? "top-7" : "top-0")} onClick={toggleViewPassword}>
          {viewPassword ? <EyeSlashIcon className='text-white200 size-6' /> : <EyeIcon className='text-white200 size-6' />}
        </div>
      )}
    </div>
  );
};
