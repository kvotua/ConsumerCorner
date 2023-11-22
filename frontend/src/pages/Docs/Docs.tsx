import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const Docs = () => {
  return (
    <div>
      <TitlePoint title="Документы" pointName="ИП АКУЛИЧ В.С" />
      <div className="">
        <h1 className="title">Простите, эта страница пока не работает :(</h1>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Docs }
