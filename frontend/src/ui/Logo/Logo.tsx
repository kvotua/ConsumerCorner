import { motion } from "framer-motion"
import { forwardRef } from "react"
import logo from "src/assets/logo.svg"

export const Logo = forwardRef<HTMLDivElement>((_, ref) => (
  <div className="w-20 h-20" ref={ref}>
    <img src={logo} alt="logo" />
  </div>
))

export const MLogo = motion(Logo)
