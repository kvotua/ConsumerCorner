import { FC } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"

import { axiosBase } from "src/axios"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { useAppSelector } from "src/hooks/useAppSelector"
import { getUser } from "src/store/slice/userSlice"
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
  const isAuth = useAppSelector((state) => state.userSlice.isAuth)
  if (isAuth) return <Navigate to={"/points"} />

  const onClick = () => {
    handleSubmit((data) => {
      const fullName = data.FIO?.split(" ")
      try {
        axiosBase
          .post(`/proprietors`, {
            name: fullName[0],
            surname: fullName[1],
            login: data.login,
            password: data.password,
            email: "example@example.com",
          })
          .then(({ data }) => {
            dispatch(getUser(data))
            localStorage.setItem("token", data)
          })
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <div className="flex flex-col h-full container pt-8">
      <div className="">
        <Logo />
      </div>
      <h1 className="title">Регистрация</h1>
      <form className="flex flex-col gap-[10px] pb-[20px] flex-grow">
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
      <div className="flex flex-col gap-[10px] pb-2">
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
