import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const Rights = () => {
  const token = localStorage.getItem("token")
  const point = useAppSelector((state) => state.pointSlice)
  return (
    <div className="flex flex-col h-full container pt-8">
      <TitlePoint title="Права покупателя" pointName={point.title} />
      <div className="flex-grow">
        <iframe></iframe>
      </div>
      <div className="pb-4 flex flex-col gap-[10px]">
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
