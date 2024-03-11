import { FC } from "react"
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form"

import arrow from "src/assets/arrow.svg"

interface IButtonUpload {
  title: string
  useForm?: UseFormRegisterReturn
  typeFile: string
  isMultiple?: boolean
  isError: boolean
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldError>>
  id: string
}
const ButtonUpload: FC<IButtonUpload> = ({
  title,
  useForm,
  typeFile,
  isMultiple = false,
  isError = false,
  errorMessage,
  id,
}) => {
  return (
    <label htmlFor={id}>
      <div
        className={`block w-full py-[20px] px-[26px] ${
          isError ? "bg-red" : "bg-white"
        } rounded-activeBorder relative`}
      >
        <span className="text-[20px] text-black font-medium"> {title}</span>
        <img
          src={arrow}
          alt=""
          className="absolute right-[10px] bottom-[10px]"
        />
      </div>
      <input
        multiple={isMultiple}
        accept={typeFile}
        {...useForm}
        type="file"
        id={id}
        className="hidden"
      />
      <span
        className={`text-18px font-bold block pt-[10px] ${
          isError ? "text-red" : "text-white"
        }`}
      >
        {isError && errorMessage && errorMessage.toString()}
      </span>
    </label>
  )
}

export { ButtonUpload }
