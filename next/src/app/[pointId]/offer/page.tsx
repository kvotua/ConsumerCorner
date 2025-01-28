"use client"
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { OfferForm } from "./offerForm";
import { useParams } from "next/navigation";
import { formatName, useGetFirmaByPointId } from "@/root/services/points";
import { PointOtherScelteton } from "../PointOtherScelteton";

export default function Offer() {
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
      <h2 className="title">Предложение</h2>
      <OfferForm />
      <div className="buttons">
        <ButtonBase form="offer">Отправить</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
}
