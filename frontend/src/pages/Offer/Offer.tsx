import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { OfferForm } from "./OfferForm";

const Offer: React.FC = () => {
  return (
    <section className="wrapper">
      <h2 className="title">Предложение</h2>
      <OfferForm />
      <div className="buttons">
        <ButtonBase form="offer">Оставить предложение</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
};

export { Offer };
