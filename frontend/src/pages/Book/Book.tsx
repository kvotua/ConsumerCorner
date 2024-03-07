import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonLong } from "src/ui/Buttons/ButtonLong/ButtonLong"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const Book = () => {
  const { title } = useAppSelector((state) => state.pointSlice)
  return (
    <div className="flex flex-col h-full container pt-8">
      <TitlePoint pointName={title} title="Книга отзывов и предложений" />
      <div className="pt-[34px] mb-[20px] flex-grow">
        <span className="text-15px text-white opacity-70 font-medium pb-4 block">
          Выберите статус
        </span>
        <div className="flex flex-col gap-[20px]">
          <ButtonLong title="Предложение" link="offer" />
          <ButtonLong title="Жалоба" link="report" />
          <ButtonLong title="Другое" link="other" />
        </div>
      </div>
      <div className="pb-4">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Book }
