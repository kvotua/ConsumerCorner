import { FC } from "react";
import { Link } from "react-router-dom";

interface IButtonEntrepreneur {
  title: string;
  link?: string;
  breakAll?: boolean;
}

const ButtonEntrepreneur: FC<IButtonEntrepreneur> = ({
  title,
  link = "",
  breakAll = false,
}) => (
  <Link
    to={link}
    className={`block w-full h-[128px] relative bg-originWhite rounded-ButtonEntrepreneur pl-[16px] pt-[20px] pr-[24px] text-originBlack text-[15px] font-bold decoration-inherit shadow-myShadow ${
      breakAll ? "break-all" : ""
    }`}
  >
    <span>{title}</span>

    <div className="absolute bottom-[10px] right-[10px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26 5V26H5L0 33H26H33V26V0L26 5Z"
          fill="#3563D4"
        />
      </svg>
    </div>
  </Link>
);

export { ButtonEntrepreneur };
