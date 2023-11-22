import { FC } from "react";
import { Link } from "react-router-dom";

interface IButtonLink {
    title: string;
    isActive?: boolean;
    link: string;
}
const ButtonLink: FC<IButtonLink> = ({ title, isActive = false, link }) => {
    return (
        <Link
            to={link}
            className={`w-full py-[13px] text-15px font-bold  flex justify-center ${
                isActive
                    ? "bg-white rounded-activeBorder text-black"
                    : "border border-white rounded-passiveBorder text-white"
            }`}>
            {title}
        </Link>
    );
};

export { ButtonLink };
