import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { OfferForm } from "./offetForm";

export default function Offer() {
  return (
    <section className="wrapper container">
    <h2 className="title">Предложение</h2>
    <OfferForm />
    <div className="buttons">
      <ButtonBase form="offer">Оставить предложение</ButtonBase>
      <ButtonBack />
    </div>
  </section>
  );
}
