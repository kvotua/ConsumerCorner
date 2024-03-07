import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const Socials = () => {
  const { title } = useAppSelector((state) => state.pointSlice)
  const token = localStorage.getItem("token")
  return (
    <div className="flex flex-col h-full container pt-8">
      <TitlePoint pointName={title} title="Соц. сети" />
      <div className="flex-grow"></div>
      <ul className="pt-[20px] flex flex-col gap-[20px]">
        <li>
          <ButtonLink isActive link={``} title={`Перейти в`} />
        </li>
        <li>
          <ButtonLink isActive link={``} title={`Перейти в`} />
        </li>
        <li>
          <ButtonLink isActive link={``} title={`Перейти в`} />
        </li>
        <li>
          <ButtonLink isActive link={``} title={`Перейти в`} />
        </li>
      </ul>
      <div className="flex-grow"></div>
      <div className="mt-auto pb-4">
        {token && <ButtonSubmit title="Добавить соц. сеть" type="button" />}
        <ButtonBack />
      </div>
    </div>
  )
}

export { Socials }
