import { FC } from "react";
interface IButtonSubmit {
  title: string;
  isActive?: boolean;
  type: "button" | "submit";
  handlClick?: () => void;
}
const ButtonSubmit: FC<IButtonSubmit> = ({ title, isActive = false, type, handlClick }) => {
  return (
    <button
      type={type}
      className={`w-full py-[13px] text-15px font-bold  flex justify-center ${
        isActive
          ? "bg-white rounded-activeBorder text-black"
          : "border border-white rounded-passiveBorder text-white"
              }`}
      onClick={handlClick}>
      {title}
    </button>
  );
};

export { ButtonSubmit };
