import { FC } from "react"
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"
import { Logo } from "src/ui/Logo/Logo"

const Home: FC = ({}) => {
  return (
    <div className="flex flex-col h-full">
      <Logo />
      <h1 className="title">Добро пожаловать!</h1>
      <p className="text-center text-15px text-white opacity-70 pt-[4vh]">
        Войдите или зарегистрируйтесь, чтобы получить полный доступ к
        приложению.
      </p>
      <div className="flex flex-col gap-[10px] pt-[4vh] pb-[4vh]">
        <ButtonLink title="Регистрация" link="register" isActive />
        <ButtonLink title="Вход" link="login" />
      </div>
      <div className="flex-grow"></div>
      <p className="text-center text-15px text-white opacity-70 pb-[10px]">
        Удобные инструменты позволяющие вашему бизнесу быть в курсе и оперативно
        реагировать на пожелания клиента
      </p>
    </div>
  )
}

export { Home }
