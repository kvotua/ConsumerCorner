import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const Rights = () => {
  const token = localStorage.getItem("token")
  return (
    <div className="flex flex-col h-full">
      <TitlePoint title="Права покупателя" pointName="ИП АКУЛИЧ В.С" />
      <div className="flex-grow"></div>
      <div className="pb-[10px] flex flex-col gap-[10px]">
        {token ? (
          <ButtonSubmit title="Загрузить документ PDF" type="submit" isActive />
        ) : (
          <ButtonSubmit title="Скачать документ PDF" type="button" isActive />
        )}

        <ButtonBack />
      </div>
    </div>
  )
}

export { Rights }
