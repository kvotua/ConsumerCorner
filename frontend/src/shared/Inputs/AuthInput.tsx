import { ChangeEvent, FC } from "react";

interface IAuthInput {
  title?: string;
  setValue: (string: string) => void;
}

const AuthInput: FC<IAuthInput> = ({ title, setValue }) => (
  <label>
    <span className="font-medium text-originWhite">{title}</span>
    <input
      type="text"
      className="w-full h-[65px] rounded-inputRadius bg-[rgba(0,0,0,0)] border border-originWhite outline-none text-[20px] font-medium text-originWhite pl-[20px]"
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  </label>
);

export { AuthInput };
