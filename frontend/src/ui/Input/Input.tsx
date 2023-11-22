import React, { FC } from "react";

interface IInput extends React.HTMLProps<HTMLInputElement> {
    title: string;
    isError?: boolean;
    errorMessage?: any;
    useForm?: any;
    isActive?: boolean;
}
const Input: FC<IInput> = (props: IInput) => {
    const {
        title,
        isError,
        errorMessage,
        useForm,
        isActive = true,
    }: IInput = props;
    return (
        <label>
            <span
                className={`text-18px  block pb-[12px] ${
                    isError ? "text-red" : "text-white"
                }`}>
                {title}
            </span>
            <input
                {...useForm}
                {...props}
                type='text'
                className={`w-full py-[21px] px-[16px]  text-15px rounded-passiveBorder outline-none ${
                    isError
                        ? "border-red text-white bg-[transparent]"
                        : " text-black"
                } ${
                    isActive
                        ? "bg-white outline-none border border-[transparent]"
                        : " border border-white bg-[transparent] text-white"
                }`}
            />
            <span className='text-red text-15px'>{errorMessage}</span>
        </label>
    );
};

export { Input };
