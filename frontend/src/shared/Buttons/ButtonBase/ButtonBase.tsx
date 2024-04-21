import { useNavigate } from "react-router-dom";
import { IButton } from "./ButtonBase.model";
import { HTMLMotionProps, motion } from "framer-motion";

const ButtonBase: React.FC<Partial<IButton> & HTMLMotionProps<"button">> = ({
  children,
  disabled = false,
  isActive = true,
  handleClick,
  className,
  link,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <motion.button
      whileTap={{
        scale: !disabled ? 0.95 : 1,
      }}
      {...props}
      disabled={disabled}
      onClick={() => {
        if (link) {
          navigate(link);
        }
        handleClick && handleClick();
      }}
      className={`w-full text-textColor-black p-3 text-bold disabled:opacity-70 font-bold duration-100 ${isActive ? "rounded-right bg-backgroundColor-white " : "rounded-left border border-backgroundColor-white text-textColor-white"} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export { ButtonBase };
