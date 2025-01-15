"use client";
import { useRouter } from "next/navigation";
import { IButton } from "./ButtonBase.model";

type RoundedCorners = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ButtonBaseProps extends Partial<IButton> {
  roundedCorners?: RoundedCorners[];
}

const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  disabled = false,
  isActive = true,
  handleClick,
  className,
  link,
  roundedCorners = ['bottom-right'],
  ...props
}) => {
  const { push } = useRouter();

  const roundedClass = {
    'top-left': 'rounded-tl',
    'top-right': 'rounded-tr',
    'bottom-left': 'rounded-bl',
    'bottom-right': 'rounded-br',
  };

  const roundedStyles = Object.keys(roundedClass)
    .filter(corner => !roundedCorners.includes(corner as RoundedCorners))
    .map(corner => roundedClass[corner as keyof typeof roundedClass])
    .join(' ');

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
      className={`w-full text-textColor-black p-3 text-bold disabled:opacity-70 font-bold duration-100 ${roundedStyles} ${
        isActive
          ? "bg-backgroundColor-white"
          : "border border-backgroundColor-white text-textColor-white"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export { ButtonBase };
