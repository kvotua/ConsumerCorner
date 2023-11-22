import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonLong } from "src/ui/Buttons/ButtonLong/ButtonLong"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const Book = () => {
  return (
    <div>
      <TitlePoint pointName="123" title="123" />
      <div className="pt-[34px]">
        <span className="text-15px text-white opacity-70 font-medium pb-[10px] block">
          Выберите статус
        </span>
        <div className="flex flex-col gap-[20px]">
          <ButtonLong title="Предложение" link="offer" />
          <ButtonLong title="Жалоба" link="report" />
          <ButtonLong title="Другое" link="other" />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Book }
