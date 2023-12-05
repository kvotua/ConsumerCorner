import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface IButtonBack {
  title?: string
  isActive?: boolean
}
const ButtonBack: FC<IButtonBack> = ({ title = "назад", isActive = false }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(-1)
  }
  return (
    <div
      className={`w-full py-[13px] text-15px font-bold  flex justify-center cursor-pointer ${
        isActive
          ? "bg-white rounded-activeBorder text-black"
          : "border border-white rounded-passiveBorder text-white"
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  )
}

export { ButtonBack }
