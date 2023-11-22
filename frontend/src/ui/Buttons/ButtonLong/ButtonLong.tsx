import { FC } from "react"
import { Link } from "react-router-dom"

import arrow from "src/assets/arrow.svg"

interface IButtonLong {
  title: string
  link: string
}
const ButtonLong: FC<IButtonLong> = ({ title, link }) => {
  return (
    <Link
      to={link}
      className="block w-full py-[20px] px-[26px] bg-white rounded-activeBorder relative"
    >
      <span className="text-[20px] text-black font-medium">{title}</span>
      <img src={arrow} alt="" className="absolute right-[10px] bottom-[10px]" />
    </Link>
  )
}

export { ButtonLong }
