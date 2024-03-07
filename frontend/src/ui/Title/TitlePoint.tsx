import { FC } from "react"

interface ITitlePoint {
  title: string
  pointName: string
}
const TitlePoint: FC<ITitlePoint> = ({ title, pointName }) => {
  return (
    <>
      <span className="text-white text-18px opacity-70">
        Уголок потребителя
      </span>
      <h1 className="text-30px text-white font-bold block mb-4">
        {pointName}
      </h1>
      <h2 className="text-white text-30px font-bold py-[10px] border-b ">
        {title}
      </h2>
    </>
  )
}

export { TitlePoint }
