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
    <div>
      <Title title="ОТЗЫВЫ" />
      <div className="mt-[8vh] h-[60vh] overflow-scroll rounded-passiveBorder">
        <ul className="flex flex-col gap-[20px]">
          {comments?.map(({ message }: { message: string }) => (
            <li className="w-full break-words  p-[18px] bg-white text-black rounded-passiveBorder font-medium">
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Reviews }
