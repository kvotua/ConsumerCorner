import { Link } from "react-router-dom";
import { IButtonBig } from "./ButtonBig.model";

const ButtonBig: React.FC<IButtonBig> = ({ children, link, ...props }) => {
  return (
    <Link
      to={link}
      {...props}
      className="w-full h-32 p-4 bg-backgroundColor-white text-textColor-black font-semibold text-lg leading-5 rounded-right relative"
    > 
      {children}
      <img
        src="/corner.svg"
        alt="corner"
        className="absolute bottom-4 right-4"
      />
    </Link>
  );
};

export { ButtonBig };
