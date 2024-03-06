import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"
import { Logo } from "src/ui/Logo/Logo"

const Home: FC = () => {
  const isAuth = useAppSelector((state) => state.userSlice.isAuth)
  if (isAuth) return <Navigate to={"/points"} />
  return (
    <div className="flex flex-col h-full container pt-8">
      <Logo />
      <h1 className="title">Добро пожаловать!</h1>
      <p className="text-center text-15px text-white opacity-70 pt-[4vh]">
        Войдите или зарегистрируйтесь, чтобы получить полный доступ к
        приложению.
      </p>
      <div className="flex flex-col gap-[10px] pt-[8vh] pb-[8vh] flex-grow">
        <ButtonLink title="Регистрация" link="register" isActive />
        <ButtonLink title="Вход" link="login" />
      </div>
      <p className="text-center text-15px text-white opacity-70 pb-[10px]">
        Удобные инструменты позволяющие вашему бизнесу быть в курсе и оперативно
        реагировать на пожелания клиента
      </p>
    </div>
  )
}

export { Home }
