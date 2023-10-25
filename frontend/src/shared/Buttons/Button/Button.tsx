import { FC } from "react";
import { Link } from "react-router-dom";

interface IButton {
  isActive?: boolean;
  type: "submit" | "button";
  title: string;
  handleClick?: () => void;
  style?: any;
  link?: string;
}

const Button: FC<IButton> = ({
  isActive = false,
  type,
  title,
  handleClick,
  style,
  link,
}) => (
  <Link to={`${link ? link : ""}`} className="w-full">
    <button
      type={type}
      className={`w-full h-[45px] flex items-center justify-center text-[15px] font-bold duration-200 ${
        isActive
          ? "bg-originWhite text-originBlack rounded-ButtonActive"
          : "text-originWhite rounded-ButtonPassive border border-originWhite"
      }`}
      style={{ ...style }}
      onClick={handleClick}
    >
      {title}
    </button>
  </Link>
);

export { Button };
