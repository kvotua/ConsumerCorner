import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { usePostCommentMutation } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const Offer = () => {
  const [value, setValue] = useState("")
  const [addComment] = usePostCommentMutation()
  const { pointId } = useParams()
  const navigate = useNavigate()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addComment({
      pointID: pointId,
      message: value,
    }).then(() => navigate("/thanks"))
  }
  return (
    <div>
      <TitlePoint pointName="123" title="Предложение" />
      <div className="">
        <span className="text-white text-18px opacity-70 block pt-[8vh] pb-[2vh]">
          Пожалуйста, напишите в форму ниже ваше предложение.
        </span>
        <form onSubmit={(e) => onSubmit(e)}>
          <textarea
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="resize-none rounded-passiveBorder bg-white w-full h-[30vh] px-[19px] py-[18px] text-18px font-bold text-black"
            placeholder="Напишите ваше предложение"
          ></textarea>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
            <ButtonSubmit title="Отправить" type="submit" isActive />
            <ButtonBack />
          </div>
        </form>
      </div>
    </div>
  )
}

export { Offer }
