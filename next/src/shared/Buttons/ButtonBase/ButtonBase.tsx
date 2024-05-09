"use client";
import { useRouter } from "next/navigation";
import { IButton } from "./ButtonBase.model";

const ButtonBase: React.FC<Partial<IButton>> = ({
  children,
  disabled = false,
  isActive = true,
  handleClick,
  className,
  link,
  ...props
}) => {
  const { push } = useRouter();
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={() => {
        if (link) {
          push(link);
        }
        handleClick && handleClick();
      }}
      className={`w-full text-textColor-black p-3 text-bold disabled:opacity-70 font-bold duration-100 ${
        isActive
          ? "rounded-right bg-backgroundColor-white "
          : "rounded-left border border-backgroundColor-white text-textColor-white"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export { ButtonBase };
