import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { TitlePoint } from "src/ui/Title/TitlePoint"
import { List } from "./List"
import { useAppSelector } from "src/hooks/useAppSelector"

const Docs = () => {
  const token = localStorage.getItem("token")
  const { title } = useAppSelector((state) => state.pointSlice)

  return (
    <div className="flex flex-col h-full">
      <TitlePoint title="Документы" pointName={title} />

      <div className="flex-grow  mb-[20px] mt-[20px]">
        <List />
      </div>

      <div className="pb-[10px] flex flex-col gap-[10px]">
        {token ? (
          <ButtonSubmit title="Загрузить документ PDF" type="submit" isActive />
        ) : (
          <ButtonSubmit title="Скачать документы PDF" type="button" isActive />
        )}
        <ButtonBack />
      </div>
    </div>
  )
}

export { Docs }
