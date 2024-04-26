import { useParams } from "react-router-dom";
import { useGetPointById } from "src/app/services/points.service";
import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { InfoField } from "src/shared/InfoField/InfoField";

const Info: React.FC = () => {
  const { pointId } = useParams();
  const { data: point } = useGetPointById(pointId!);
  return (
    <section className="wrapper">
      <h2 className="title">Информаия</h2>
      <span className="text-center text-sm ">{point?.title}</span>

      <div className="flex-grow flex flex-col gap-8 py-5">
        <InfoField info={point?.title || ""} titleInfo="Название" />
        <InfoField info={point?.address || ""} titleInfo="Адрес" />
        <InfoField info={point?.inn || ""} titleInfo="ИНН" />
        <InfoField info={point?.ogrn || ""} titleInfo="ОГРН" />
        <ButtonBase link={`/point/${pointId}/docs`}>Документы</ButtonBase>
      </div>
      <div className="buttons">
        <ButtonBack />
      </div>
    </section>
  );
};

export default Info;
