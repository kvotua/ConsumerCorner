import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { ReportForm } from "./reportForm";

export default function Report() {
  return (
    <section className="wrapper container">
      <h2 className="title">Жалоба</h2>
      <ReportForm />
      <div className="buttons">
        <ButtonBase form="report">Оставить жалобу</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
}
