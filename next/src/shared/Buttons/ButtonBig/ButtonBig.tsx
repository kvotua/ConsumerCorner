import Image from "next/image";

import cornerIcon from "@/root/assets/corner.svg";
import { IButtonBig } from "./ButtonBig.model";
import Link from "next/link";

const ButtonBig: React.FC<IButtonBig> = ({ children, link, ...props }) => {
  return (
    <Link
      href={link}
      {...props}
      className="w-full h-32 p-4 bg-backgroundColor-white text-textColor-black font-semibold text-lg leading-5 rounded-right relative"
    >
      {children}
      <Image
        src={cornerIcon}
        alt="corner"
        className="absolute bottom-4 right-4"
      />
    </Link>
  );
};

export { ButtonBig };
