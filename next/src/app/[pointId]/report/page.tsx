import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { ReportForm } from "./reportForm";

export default function Report() {
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

      <h2 className="title">Отзыв</h2>
      <ReportForm />

      <div className="buttons">
        <ButtonBase form="report">Отправить</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
}
