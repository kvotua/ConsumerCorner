import { FC } from "react"
interface IButtonSubmit {
  title: string
  isActive?: boolean
  type: "button" | "submit"
  handlClick?: () => void
  id?: string
}
const ButtonSubmit: FC<IButtonSubmit> = ({
  title,
  isActive = false,
  type,
  handlClick,
  id,
}) => {
  return (
    <button
      id={id}
      type={type}
      className={`w-full py-[13px] text-15px font-bold  flex justify-center ${
        isActive
          ? "bg-white rounded-activeBorder text-black"
          : "border border-white rounded-passiveBorder text-white"
      }`}
      onClick={handlClick}
    >
      {title}
    </button>
  )
}

export { ButtonSubmit }
