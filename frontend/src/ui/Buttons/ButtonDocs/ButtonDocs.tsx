import { FC } from "react"
import { Link } from "react-router-dom"

import union from "src/assets/Union.svg"

interface IButtonDocs {
  title: string
  link: string
  handlClick?: () => void
}
const ButtonDocs: FC<IButtonDocs> = ({ title, link, handlClick }) => {
  return (
    <Link
      to={link}
      className="w-full h-[128px] bg-white rounded-activeBorder relative px-[16px] py-[20px]"
      onClick={handlClick}
    >
      <span className="text-black text-15px font-semibold">{title}</span>
      <img src={union} alt="" className="absolute bottom-[9px] right-[13px]" />
    </Link>
  )
}

export { ButtonDocs }
