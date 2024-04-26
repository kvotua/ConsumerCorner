import { forwardRef, useId } from "react";
import { ITextFieldBase } from "./TextFieldBase.model";
import ReactInputMask from "react-input-mask";

const TextFieldBase: React.FC<ITextFieldBase> = forwardRef(
  (
    {
      label = "",
      type = "text",
      subLabel,
      isError,
      errorMessage,
      className,
      isPhone = false,
      ...props
    },
    ref: any
  ) => {
    const inputId = useId();
    return (
      <label
        htmlFor={inputId}
        className={`${isError ? "animate-shake" : ""} w-full text-start`}
      >
        <span
          className={`font-medium text-lg ${isError ? "text-textColor-error" : ""}`}
        >
          {label}
        </span>
        {isPhone ? (
          <ReactInputMask
            mask="+7 999 999 99 99"
            placeholder="+7 905 123 45 67"
            id={inputId}
            className={`bg-backgroundColor-white outline-none w-full px-4 py-5 rounded-top text-textColor-black font-bold  ${className}`}
            {...props}
          >
            <input
              type={type}
              id={inputId}
              ref={ref}
              className={`bg-backgroundColor-white outline-none w-full px-4 py-5 rounded-top text-textColor-black font-bold  ${className}`}
            />
          </ReactInputMask>
        ) : (
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={`bg-backgroundColor-white outline-none w-full px-4 py-5 rounded-top text-textColor-black font-bold  ${className}`}
            {...props}
          />
        )}
        {errorMessage && (
          <span
            className={`text-sm font-medium ${isError ? "text-textColor-error" : ""}`}
          >
            {errorMessage?.message || subLabel}
          </span>
        )}
      </label>
    );
  }
);

export { TextFieldBase };
