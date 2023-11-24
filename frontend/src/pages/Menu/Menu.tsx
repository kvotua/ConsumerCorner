import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonDocs } from "src/ui/Buttons/ButtonDocs/ButtonDocs"

const Menu = () => {
  const { title } = useAppSelector((state) => state.pointSlice)
  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="title !text-start">{title}</h1>
        <div className="grid grid-cols-2 gap-[10px] pt-[30px]">
          <ButtonDocs
            title="Права покупателя"
            link=""
            handlClick={() => alert("простите, страница скоро заработает")}
          />
          <ButtonDocs title="Книга отзывов" link="book" />
          <ButtonDocs
            title="Документы"
            link=""
            handlClick={() => alert("простите, страница скоро заработает")}
          />
          <ButtonDocs
            title="Сайт"
            link=""
            handlClick={() => alert("простите, страница скоро заработает")}
          />
          <ButtonDocs
            title="Соц. сети"
            link=""
            handlClick={() => alert("простите, страница скоро заработает")}
          />
        </div>
      </div>

      <div className="mt-auto pb-[10px]">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Menu }
