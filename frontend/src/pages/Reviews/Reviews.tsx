import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { Title } from "src/ui/Title/Title"
import star from "src/assets/starBlack.svg"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { useGetCommentsQuery } from "src/store/RTKSlice/api"

const Reviews = () => {
  const token = localStorage.getItem("token")
  const { pointId } = useParams()
  const { data: comments } = useGetCommentsQuery({ token, pointId })

  return (
    <div className="flex flex-col h-full container pt-4">
      <Title title="ОТЗЫВЫ" />
      <div className="mt-[8vh] h-[55vh] overflow-scroll rounded-passiveBorder mb-[20px] flex-grow">
        <ul className="flex flex-col gap-[20px]">
          <AnimatePresence>
            {comments?.map(({ message }: { message: string }, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="w-full break-words  p-[18px] bg-white text-black rounded-passiveBorder font-medium"
              >
                {message}
                <div className="pt-[10px] flex">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <div className="pb-4">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Reviews }
