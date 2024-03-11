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

const Login: FC = () => {
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
      try {
        axiosBase
          .get(
            `/proprietors/token?login=${data.login}&password=${data.password}`,
          )
          .then((response) => {
            localStorage.setItem("token", response.data)
            dispatch(getUser(response.data))
            console.log(response)
          })
          .catch((err) => {
            if (err.response.data.detail === "Wrong login or password") {
              return alert("неправильный логин или пароль")
            }
            alert("что-то пошло не так")
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
      <h1 className="title">Вход</h1>
      <form className="flex flex-col gap-[10px] pb-[20px] flex-grow">
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
      <div className="flex flex-col gap-[10px] pb-4">
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
