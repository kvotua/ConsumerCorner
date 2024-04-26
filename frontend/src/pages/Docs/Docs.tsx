import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";

const Docs: React.FC = () => {
  return (
    <section className="wrapper">
      <div className="flex-grow flex justify-center items-center text-2xl text-center font-bold">
        Эта страница скоро будет работать
      </div>
      <div className="buttons">
        <ButtonBack />
      </div>
    </section>
  );
};

export default Docs;
