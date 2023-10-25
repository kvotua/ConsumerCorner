import { ButtonEntrepreneur } from "../../shared/Buttons/ButtonEntrepreneur/ButtonEntrepreneur";

const Point = () => {

  return (
    <div className="container bg-main h-screen pt-[100px]">
      <h2 className="text-center text-originWhite text-[30px] font-bold mb-10">
        Название
      </h2>
      <div className="grid grid-cols-2 gap-[10px]">
        <ButtonEntrepreneur title="Книга жалоб и предложений" link="comments" />
        <ButtonEntrepreneur title="Отзывы" link="reviews" />
        <ButtonEntrepreneur title="Документы" link="docs" />
        <ButtonEntrepreneur title="Соц.сети и сайт" link="socials" />
      </div>
    </div>
  );
};

export default Point;
