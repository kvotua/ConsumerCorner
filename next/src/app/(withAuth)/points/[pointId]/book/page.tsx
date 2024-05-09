import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonLong } from "@/shared/Buttons/ButtonLong/ButtonLong";

export default function Book() {
  return (
    <section className="wrapper container">
      <h2 className="title">Книга жалоб и предложений</h2>
      <div className="flex-grow flex flex-col gap-2 py-5">
        <span className="opacity-50">Выберите статус</span>
        <ButtonLong link="report">Жалоба</ButtonLong>
        <ButtonLong link="offer">Предложение</ButtonLong>
      </div>
      <div className="buttons">
        <ButtonBack />
      </div>
    </section>
  );
}
