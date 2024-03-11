import { motion } from "framer-motion"
import { forwardRef } from "react"
import { Link } from "react-router-dom"

interface IButtonLink {
  title: string
  isActive?: boolean
  link: string
}
export const ButtonLink = forwardRef<HTMLAnchorElement, IButtonLink>(
  ({ title, isActive = false, link }, ref) => {
    return (
      <Link
        ref={ref}
        to={link}
        className={`w-full py-[13px] text-15px font-bold  flex justify-center ${
          isActive
            ? "bg-white rounded-activeBorder text-black"
            : "border border-white rounded-passiveBorder text-white"
        }`}
      >
        {title}
      </Link>
    )
  },
)

export const MButtonLink = motion(ButtonLink)
