import { ChangeEvent, FC, useState } from "react";

interface IAuthInput {
  title?: string;
  setValue: (string: string) => void;
  value?: string;
}

const AuthInput: FC<IAuthInput> = ({ title, setValue, value = "" }) => {
  return (
    <label>
      <span className="font-medium text-originWhite">{title}</span>
      <input
        type="text"
        value={value}
        className="w-full h-[65px] rounded-inputRadius bg-[rgba(0,0,0,0)] border border-originWhite outline-none text-[20px] font-medium text-originWhite pl-[20px]"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </label>
  );
};

export { AuthInput };
