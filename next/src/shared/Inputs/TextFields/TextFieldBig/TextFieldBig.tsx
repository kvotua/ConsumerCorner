import { forwardRef, useId } from "react";
import { ITextFieldBig } from "./TextFieldBig.model";

const TextFieldBig: React.FC<ITextFieldBig> = forwardRef(
  ({ isError, className, label, ...props }, ref) => {
    const textAreaId = useId();
    return (
      <label htmlFor={textAreaId}>
        <span
          className={`text-lg opacity-50 pb-2 block ${
            isError ? "text-textColor-error opacity-100" : ""
          }`}
        >
          {label}
        </span>
        <textarea
          id={textAreaId}
          ref={ref}
          {...props}
          className={`resize-none w-full p-5 rounded-left outline-none bg-backgroundColor-white text-textColor-black font-bold h-64 ${
            isError ? "animate-shake" : ""
          } ${className}`}
        ></textarea>
      </label>
    );
  }
);
TextFieldBig.displayName = "TextFieldBig";

export { TextFieldBig };
