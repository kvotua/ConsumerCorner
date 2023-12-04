import { FC, ChangeEvent, useState } from "react"
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form"
import arrow from "src/assets/arrow.svg"

interface IButtonUpload {
  title: string
  isError?: boolean
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  useForm?: UseFormRegisterReturn
  id: string
}

const ButtonUpload: FC<IButtonUpload> = ({
  title,
  isError = false,
  errorMessage = "error",
  useForm,
  id,
}) => {
  const [fileName, setFileName] = useState<string | null>(null)
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files!
    setFileName(file[0].name)
  }
  return (
    <label htmlFor={id}>
      <div
        className={`block w-full py-[20px] px-[26px]  rounded-activeBorder relative border-2 bg-white ${
          isError && !fileName ? "border-red " : "border-transparent"
        }`}
      >
        <span
          className={`text-[20px] text-black font-medium ${
            isError && !fileName ? "text-red" : ""
          }`}
        >
          {title}
        </span>
        <img
          src={arrow}
          alt="arrow"
          className="absolute right-[10px] bottom-[10px]"
        />
      </div>
      <span
        className={`text-18px font-bold block pt-[10px] ${
          isError && !fileName ? "text-red" : "text-white"
        }`}
      >
        {isError && !fileName
          ? errorMessage.toString()
          : fileName
            ? fileName
            : ""}
      </span>
      <input
        {...useForm}
        type="file"
        id={id}
        className="w-0 h-0 absolute"
        onChange={onChange}
      />
    </label>
  )
}

export { ButtonUpload }
