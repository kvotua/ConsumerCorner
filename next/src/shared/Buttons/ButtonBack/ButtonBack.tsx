"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import backIcon from "@/root/assets/back.svg";
import { ButtonBase } from "../ButtonBase/ButtonBase";
import { IButtonBack } from "./ButtonBack.model";

const ButtonBack: React.FC<IButtonBack> = ({
  link,
  children,
  isActive = false,
  disabled,
  className,
  handleClick,
}) => {
  const { push, back } = useRouter();
  return (
    <div
      onClick={() => {
        if (link) {
          push(link);
        } else {
          back();
        }
        handleClick && handleClick();
      }}
      className="relative active:scale-95 duration-100"
    >
      {!children && (
        <Image
          src={backIcon}
          alt="arrow"
          className={`w-5 absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-[280%] ${
            disabled ? "opacity-70" : ""
          }`}
        />
      )}
      <ButtonBase disabled={disabled} className={className} isActive={isActive}>
        {children ? children : "Назад"}
      </ButtonBase>
    </div>
  );
};

export { ButtonBack };
