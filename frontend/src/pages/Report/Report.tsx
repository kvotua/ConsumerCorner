import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { ReportForm } from "./ReportForm";

const Report: React.FC = () => {
  return (
    <section className="wrapper">
      <h2 className="title">Жалоба</h2>
      <ReportForm />
      <div className="buttons">
        <ButtonBase form="report">Оставить жалобу</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
};

export { Report };
