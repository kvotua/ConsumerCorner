import { forwardRef, useId } from "react";
import { IFileInput } from "./FileInput.model";
import { Controller } from "react-hook-form";
import Dropzone from "react-dropzone";

const FileInput: React.FC<IFileInput> = forwardRef(
  (
    {
      isError,
      control,
      className,
      label,
      name,
      progressUbload,
      fileName,
      errorMessage,
      successUpload,
      errorUpload,
      rules,
      ...props
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const inputId = useId();
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange } }) => (
          <Dropzone onDrop={onChange}>
            {({ getInputProps }) => (
              <label
                htmlFor={inputId}
                className={`${isError ? "animate-shake" : ""} w-full text-start`}
              >
                <div
                  className={`bg-backgroundColor-white outline-none w-full px-4 py-5 flex justify-between items-center rounded-top text-textColor-black font-bold relative overflow-hidden ${className} z-10 flex justify-between items-center`}
                >
                  {label && (
                    <span
                      className={`${isError ? "text-textColor-error" : ""}`}
                    >
                      {label}
                    </span>
                  )}
                  <input
                    {...getInputProps()}
                    ref={ref}
                    type={"file"}
                    id={inputId}
                    {...props}
                    className="w-0 h-0 absolute"
                  />

                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-backgroundColor-black ${successUpload ? "bg-green-600" : errorUpload ? "bg-red-600" : ""} duration-100`}
                    style={{ width: `${progressUbload}%` }}
                  ></div>
                </div>
                {errorMessage && (
                  <span className="text-textColor-error">
                    {errorMessage.message}
                  </span>
                )}
              </label>
            )}
          </Dropzone>
        )}
      />
    );
  }
);

export { FileInput };
