import { ChangeEvent, FC } from "react";

interface IAuthInput {
  title?: string;
  setValue: (string: string) => void;
  value?: string;
  type?: string;
  handleChange?: () => void;
}

const AuthInput: FC<IAuthInput> = ({
  title,
  setValue,
  value = "",
  type = "text",
  handleChange,
}) => {
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange();
    }
    setValue(e.target.value);
  };
  return (
    <label>
      <span className="font-medium text-originWhite">{title}</span>
      <input
        type={type}
        value={value}
        className="w-full h-[65px] rounded-inputRadius bg-[rgba(0,0,0,0)] border border-originWhite outline-none text-[20px] font-medium text-originWhite pl-[20px] pr-[20px]"
        onChange={(e: ChangeEvent<HTMLInputElement>) => change(e)}
      />
    </label>
  );
};

export { AuthInput };
