import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IButtonBack {
    title?: string;
    isActive?: boolean;
}
const ButtonBack: FC<IButtonBack> = ({ title = "назад", isActive = false }) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(-1);
    };
    return (
        <button
            className={`w-full py-[13px] text-15px font-bold  flex justify-center ${
                isActive
                    ? "bg-white rounded-activeBorder text-black"
                    : "border border-white rounded-passiveBorder text-white"
            }`}
            onClick={onClick}>
            {title}
        </button>
    );
};

export { ButtonBack };
