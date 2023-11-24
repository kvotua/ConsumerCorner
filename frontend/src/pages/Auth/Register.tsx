import { FC } from "react"
import { useForm, FieldValues } from "react-hook-form"

import { axiosBase } from "src/axios"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { setUser } from "src/store/slice/userSlice"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { Input } from "src/ui/Input/Input"
import { Logo } from "src/ui/Logo/Logo"

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useAppDispatch()
  const onSubmit = (data: FieldValues) => {
    const fullName = data.FIO?.split(" ")

    try {
      axiosBase
        .post(`/proprietors`, {
          name: fullName[0],
          surname: fullName[1],
          login: data.login,
          password: data.password,
        })
        .then(({ data }) => {
          dispatch(
            setUser({
              name: fullName[0],
              surname: fullName[1],
              login: data.login,
              password: data.password,
              token: data,
            }),
          )
          localStorage.setItem("token", data)
        })
    } catch (error) {
      console.log(error)
    }
  }
  const onClick = () => {
    handleSubmit((data) => onSubmit(data))()
  }
  return (
    <div className=" flex flex-col h-full">
      <div className="">
        <Logo />
      </div>
      <h1 className="title">Регистрация</h1>
      <form
        className="flex flex-col gap-[10px] pb-[20px]"
      >
        <Input
          useForm={register("FIO", { required: "Введите ФИО" })}
          title="Ф.И.О"
          isError={!!errors.FIO}
          errorMessage={errors.FIO?.message}
        />
        <Input
          useForm={register("login", {
            required: "Введите логин",
            minLength: 2,
          })}
          title="Логин"
          isError={!!errors.login}
          errorMessage={errors.login?.message}
        />
        <Input
          useForm={register("password", {
            required: "Введите пароль",
            minLength: 2,
          })}
          title="Пароль"
          isError={!!errors.password}
          errorMessage={errors.password?.message}
          type="password"
        />
      </form>
      <div className="flex-grow"></div>
      <div className="flex flex-col gap-[10px]">
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

export { Register }
