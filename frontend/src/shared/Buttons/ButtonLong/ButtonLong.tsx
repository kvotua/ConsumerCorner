import { useNavigate } from "react-router-dom";
import { HTMLMotionProps, motion } from "framer-motion";
import { IButtonLong } from "./ButtonLong.model";

const ButtonLong: React.FC<Partial<IButtonLong> & HTMLMotionProps<"div">> = ({
  children,
  isActive = true,
  handleClick,
  className,
  link,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileTap={{
        scale: 0.95,
      }}
      {...props}
      onClick={() => {
        if (link) {
          navigate(link);
        }
        handleClick && handleClick();
      }}
      className={`w-full text-textColor-black px-5 py-6 text-bold disabled:opacity-70 font-bold duration-100 ${isActive ? "rounded-right bg-backgroundColor-white " : "rounded-left border border-backgroundColor-white text-textColor-white"} relative ${className}`}
    >
      {children}
      <img src="/arrow.svg" alt="arrow" className="absolute right-3 bottom-3"/>
    </motion.div>
  );
};

export { ButtonLong };
