import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonDocs } from "src/ui/Buttons/ButtonDocs/ButtonDocs"

const Menu = () => {
  const { title } = useAppSelector((state) => state.pointSlice)
  const link = "https://vk.com/eviir"
  return (
    <div className="flex flex-col h-full container pt-8">
      <h1 className="title !text-start">{title}</h1>
      <div className="grid grid-cols-2 gap-[10px] pt-[30px] justify-items-center">
        <ButtonDocs title="Права покупателя" link="rights" />
        <ButtonDocs title="Книга отзывов" link="book" />
        <ButtonDocs title="Документы" link="docs" />
        {link && <ButtonDocs title="Сайт" link={link} />}
        <ButtonDocs title="Соц. сети" link="Socials" />
      </div>

      <div className="mt-auto pb-4 pt-4">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Menu }
