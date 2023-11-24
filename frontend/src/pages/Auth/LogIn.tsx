import { FC } from "react"
import { useForm, FieldValues } from "react-hook-form"

import { axiosBase } from "src/axios"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { setUser } from "src/store/slice/userSlice"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { Input } from "src/ui/Input/Input"
import { Logo } from "src/ui/Logo/Logo"

interface IDataForm {
  login: string
  password: string
}
const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useAppDispatch()
  const onSubmit = (data: FieldValues | IDataForm) => {
    try {
      axiosBase
        .get(`/proprietors/token?login=${data.login}&password=${data.password}`)
        .then(({ data }) => {
          localStorage.setItem("token", data)
          dispatch(setUser({ token: data }))
        })
    } catch (error) {
      alert("произошла ошибка")
    }
  }
  const onClick = () => {
    handleSubmit((data) => onSubmit(data))()
  }
  return (
    <div className="flex flex-col h-full">
      <div className="">
        <Logo />
      </div>
      <h1 className="title">Вход</h1>
      <form className="flex flex-col gap-[10px] pb-[20px]">
        <Input
          useForm={register("login", {
            required: "Введите логин",
          })}
          title="Логин"
          isError={!!errors.login}
          errorMessage={errors.login?.message}
        />
        <Input
          useForm={register("password", {
            required: "Введите пароль",
          })}
          title="Пароль"
          isError={!!errors.password}
          errorMessage={errors.password?.message}
          type="password"
        />
      </form>
      <div className="flex-grow"></div>
      <div className="flex flex-col gap-[10px] pb-[10px]">
        <ButtonSubmit
          isActive
          title="Дальше"
          type="submit"
          handlClick={onClick}
        />
        <ButtonBack />
      </div>
    </div>
  )
}

export { Login }
