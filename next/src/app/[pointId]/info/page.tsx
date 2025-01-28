'use client'
import { useGetPointById } from "@/root/services/points";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { InfoField } from "@/shared/InfoField/InfoField";
import { useParams } from "next/navigation";

export default function Info() {
  const { pointId } = useParams();
  const { data: point } = useGetPointById(pointId as string);
  return (
    <section className="wrapper container">
      <h2 className="title">Информация</h2>
      <span className="text-center text-sm ">{point?.title}</span>

      <div className="flex-grow flex flex-col gap-8 py-5">
        <InfoField info={point?.title} titleInfo="Название" />
        <InfoField info={point?.address} titleInfo="Адрес" />
        <InfoField info={point?.inn} titleInfo="ИНН" />
        <InfoField info={point?.ogrn} titleInfo="ОГРН" />
        <ButtonBase link={`/point/${pointId}/docs`}>Документы</ButtonBase>
      </div>
      <div className="buttons">
        <ButtonBack />
      </div>
    </section>
  );
}
