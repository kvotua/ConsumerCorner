import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonLong } from "src/shared/Buttons/ButtonLong/ButtonLong";

const Book: React.FC = () => {
  return (
    <section className="wrapper">
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
};

export default Book;
