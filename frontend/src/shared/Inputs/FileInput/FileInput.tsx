import { forwardRef, useId } from "react";
import { IFileInput } from "./FileInput.model";

const FileInput: React.FC<IFileInput> = forwardRef(
  (
    { label = "", subLabel, isError, file, className, ...props },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const inputId = useId();
    return (
      <label
        htmlFor={inputId}
        className={`${isError ? "animate-shake" : ""} w-full`}
      >
        <div
          className={`bg-backgroundColor-white outline-none w-full px-4 py-5 flex justify-between items-center rounded-top text-textColor-black font-bold relative ${className}`}
        >
          <span
            className={`font-medium text-lg ${isError ? "text-textColor-error" : ""}`}
          >
            {label}
          </span>
          <input
            ref={ref}
            type={"file"}
            id={inputId}
            {...props}
            className="w-0 h-0 absolute"
          />
          <span id={`${inputId}-sublabel`} className={`text-sm font-medium`}>
            {subLabel?.slice(0, 15)}
          </span>
        </div>
      </label>
    );
  }
);

export { FileInput };
