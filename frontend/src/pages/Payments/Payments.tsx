import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { useAppSelector } from "src/hooks/useAppSelector"
import { usePostPaymentsMutation } from "src/store/RTKSlice/api"
import { getUser } from "src/store/slice/userSlice"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { Input } from "src/ui/Input/Input"
import { Title } from "src/ui/Title/Title"

const Payments = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const userId = useAppSelector((state) => state.userSlice.id)
  const token = localStorage.getItem("token")!
  const [addSum] = usePostPaymentsMutation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const onClick = () => {
    handleSubmit((data) =>
      addSum({ userId, value: data.sum * 100 }).then(() => {
        dispatch(getUser(token))
        navigate(-1)
      }),
    )()
  }
  return (
    <div className="flex flex-col h-full container pt-8">
      <Title title="ПОПОЛНИТЬ БАЛАНС" />
      <form className="mt-[20px] mb-[20px] flex-grow">
        <Input
          isError={!!errors.sum}
          errorMessage={errors.sum?.message}
          useForm={register("sum", {
            minLength: 1,
            required: "минимум 1 символ",
          })}
          title="Сумма"
        />
      </form>
      <div className=" flex flex-col gap-[10px] pb-4">
        <ButtonSubmit
          title="Пополнить"
          type="submit"
          isActive
          handlClick={onClick}
        />
        <ButtonBack />
      </div>
    </div>
  )
}

export { Payments }
