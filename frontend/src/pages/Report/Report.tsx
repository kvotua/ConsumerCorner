import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "src/hooks/useAppSelector"
import { usePostCommentMutation } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"

import { TitlePoint } from "src/ui/Title/TitlePoint"

const Report = () => {
  const [value, setValue] = useState("")
  const [addComment] = usePostCommentMutation()
  const { pointId } = useParams()
  const navigate = useNavigate()
  const onSubmit = () => {
    addComment({
      pointID: pointId,
      message: value,
    }).then(() => navigate("/thanks"))
  }
  const onClick = () => {
    onSubmit()
  }
  const { title } = useAppSelector((state) => state.pointSlice)
  return (
    <div className="flex flex-col h-full container pt-8">
      <TitlePoint pointName={title} title="Жалоба" />
      <div className="mb-[20px] flex-grow">
        <span className="text-white text-18px opacity-70 block pt-[8vh] pb-[2vh]">
          Пожалуйста, напишите в форму ниже ваше предложение.
        </span>
        <form>
          <textarea
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="resize-none rounded-passiveBorder bg-white w-full h-[30vh] px-[19px] py-[18px] text-18px font-bold text-black"
            placeholder="Напишите ваше предложение"
          ></textarea>
        </form>
      </div>
      <div className=" flex flex-col gap-[10px] pb-4">
        <ButtonSubmit
          title="Отправить"
          type="submit"
          isActive
          handlClick={onClick}
        />
        <ButtonBack />
      </div>
    </div>
  )
}

export { Report }
