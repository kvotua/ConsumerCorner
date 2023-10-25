import { ButtonEntrepreneur } from "../../shared/Buttons/ButtonEntrepreneur/ButtonEntrepreneur";

const Entrepreneur = () => {
  const titles = [
    "Книга отзывов и предложений",
    "Права покупателя",
    "Документы",
    "Сайт и соц.сети",
  ];
  return (
    <div className="container h-screen bg-main pt-[100px]">
      <div className="flex flex-wrap gap-[10px] justify-center">
        {titles.map((title: string) => (
          <ButtonEntrepreneur title={title} />
        ))}
      </div>
    </div>
  );
};

export { Entrepreneur };
