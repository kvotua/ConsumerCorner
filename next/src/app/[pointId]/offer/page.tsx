import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { OfferForm } from "./offerForm";

export default function Offer() {

  const pointInfo = {
    who: "ИП АКУЛИЧ В.С",
  }
  return (
    <section className="wrapper container">
      <p className="text-xl opacity-50 pt-5 break-words">
        уголок потребителя
      </p>
      <h2 className="title pt-3">
        {pointInfo.who}
      </h2>

      <hr className="my-4 border-t-2 border-gray-300 w-5/6" />
      <h2 className="title">Предложение</h2>
      <OfferForm />
      <div className="buttons">
        <ButtonBase form="offer">Отправить</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
}
