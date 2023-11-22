import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonDocs } from "src/ui/Buttons/ButtonDocs/ButtonDocs"

const Menu = () => {
  return (
    <div>
      <h1 className="title !text-start">ИП АКУЛИЧ В.С</h1>
      <div className="grid grid-cols-2 gap-[10px] pt-[30px]">
        <ButtonDocs title="Права покупателя" link="" handlClick={() => alert('простите, страница скоро заработает')} />
        <ButtonDocs title="Книга отзывов" link="book" />
        <ButtonDocs title="Документы" link="" handlClick={() => alert('простите, страница скоро заработает')}/>
        <ButtonDocs title="Сайт" link="" handlClick={() => alert('простите, страница скоро заработает')}/>
        <ButtonDocs title="Соц. сети" link="" handlClick={() => alert('простите, страница скоро заработает')}/>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
        <ButtonBack />
      </div>
    </div>
  )
}

export { Menu }
