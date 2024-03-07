import { Title } from "src/ui/Title/Title"
import star from "src/assets/starBlack.svg"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { useGetCommentsQuery } from "src/store/RTKSlice/api"
import { useParams } from "react-router-dom"

const Reviews = () => {
  const token = localStorage.getItem("token")
  const { pointId } = useParams()
  const { data: comments } = useGetCommentsQuery({ token, pointId })

  return (
    <div className="flex flex-col h-full">
      <Title title="ОТЗЫВЫ" />
      <div className="mt-[8vh] h-[55vh] overflow-scroll rounded-passiveBorder mb-[20px]">
        <ul className="flex flex-col gap-[20px]">
          {comments?.map(({ message }: { message: string }, id: number) => (
            <li
              key={id}
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
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow"></div>
      <div className="pb-4">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Reviews }
