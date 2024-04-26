import { useNavigate } from "react-router-dom";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";

const Thanks: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="wrapper">
      <div className="flex-grow flex flex-col items-center justify-center gap-5">
        <span className="font-bold text-3xl text-center">
          Спасибо за Ваш отзыв!
        </span>
        <p className="text-center text-lg">
          Мы учтем Ваши слова при нашей дальнейшей работе и будем стараться
          становиться лучше!
        </p>
      </div>
      <div className="buttons">
        <ButtonBase handleClick={() => navigate("/")}>На главную</ButtonBase>
      </div>
    </section>
  );
};

export default Thanks;
