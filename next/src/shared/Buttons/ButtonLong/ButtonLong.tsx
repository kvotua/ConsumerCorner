"use client";
import { HTMLMotionProps } from "framer-motion";
import Image from "next/image";

import arrowIcon from "@/root/assets/arrow.svg";
import { IButtonLong } from "./ButtonLong.model";
import Link from "next/link";

const ButtonLong: React.FC<Partial<IButtonLong>> = ({
  children,
  isActive = true,
  handleClick,
  className,
  link,
}) => {
  return (
    <Link
      href={link || ""}
      shallow
      onClick={() => {
        handleClick && handleClick();
      }}
      className={`w-full text-textColor-black px-5 py-6 text-bold disabled:opacity-70 font-bold duration-100 ${
        isActive
          ? "rounded-right bg-backgroundColor-white "
          : "rounded-left border border-backgroundColor-white text-textColor-white"
      } relative ${className}`}
    >
      {children}
      <Image
        src={arrowIcon}
        alt="arrow"
        className="absolute right-3 bottom-3"
      />
    </Link>
  );
};

export { ButtonLong };
