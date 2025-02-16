"use client"
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonLong } from "@/shared/Buttons/ButtonLong/ButtonLong";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { useParams } from "next/navigation";
import { formatName, useGetFirmaByPointId } from "@/root/services/points";
import { PointOtherScelteton } from "../PointOtherScelteton";

export default function Book() {
  const { pointId } = useParams()
  const { data } = useGetFirmaByPointId(pointId as string);

  if (data == undefined) {
    return (
      <section className="wrapper container">
        <PointOtherScelteton/>
      </section>
    )
  }

  const name = formatName(data?.name || "")

  const pointInfo = {
    title: data?.title,
    who: name,
    address: data?.address,
    inn: data?.inn,
    ogrn: data?.ogrn,
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

      <h2 className="title">Книга отзывов и предложений</h2>
      <div className="flex-grow flex flex-col gap-2 py-5">
        <span className="opacity-50">Выберите статус</span>
        <ButtonLong link="report">Оставить отзыв</ButtonLong>
        <ButtonLong link="offer">Поделиться предложением</ButtonLong>
      </div>
      <div className="buttons">
      <ButtonBase>Просмотр всех отзывов</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
}
