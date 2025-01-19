"use client";
import { useAppSelector } from "@/root/hooks/useAppSelector";
import { PointScelteton } from "./PointScelteton";
import { useParams, useRouter } from "next/navigation";
import { formatName, useGetFirmaByPointId, useGetPointById } from "@/root/services/points";
import { ButtonBig } from "@/shared/Buttons/ButtonBig/ButtonBig";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import dynamic from "next/dynamic";
import { createConfiguration, ServerConfiguration, InnApi, Configuration } from '@/client';
import type { InnApiResultPageInnInnInfoGetRequest } from "@/client/types/ObjectParamAPI";
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react';


async function fetchData(config: Configuration) {
  const apiInstance = new InnApi(config);
  const request: InnApiResultPageInnInnInfoGetRequest = {

    inn: "390000001190",
  };
  try {
    const data = await apiInstance.resultPageInnInnInfoGet(request.inn);
    console.log('API called successfully. Returned data:', data);
  } catch (error) {
    console.error("Ошибка при вызове API:", error);
  }
}

function Point() {
  var isLoading = false;
  var isRefetching = false;
  const [hasShownToast, setHasShownToast] = useState(false);
  // const baseServer = new ServerConfiguration<{}>("https://consumer-corner.kvotua.ru", {});
  // const config = createConfiguration({ baseServer });


  // fetchData(config);

  // const user = useAppSelector((state) => state.userReduser.user);
  const { pointId } = useParams();

  useEffect(() => {
    if (pointId === undefined && !hasShownToast) {
      setHasShownToast(true);
      toast.error('Точка не найдена!');
    }
  }, [pointId, hasShownToast]);

  if (pointId === undefined) {
    return <div></div>;
  }
  const { data } = useGetFirmaByPointId(pointId as string);

  console.log('debug:', data)
  if (data == undefined) {
    isLoading = true
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
      {isLoading || isRefetching ? (
        <PointScelteton />
      ) : (
        <>
          <p className="text-xl opacity-50 pt-5 break-words">
            уголок потребителя
          </p>
          <h2 className="title pt-3">
            {pointInfo.who}
          </h2>

          <hr className="my-4 border-t-2 border-gray-300 w-5/6" />
          <h2 className="title">
            {pointInfo.title}
          </h2>
          <p className="opacity-50 break-words whitespace-pre-line leading-tight mb-5">
            {pointInfo.address}
          </p>
          <div className="flex flex-col items-center space-y-6">
            {/* Секция с кнопками */}
            <div className="flex-grow">
              <div className="py-2 grid grid-cols-2 gap-2">
                <ButtonBig link={`/${pointId}/book`}>Книга отзывов</ButtonBig>
                <ButtonBig link={`/${pointId}/rights`}>Права потребителя</ButtonBig>
                <ButtonBig link={`/${pointId}/docs`}>Документы</ButtonBig>
                <ButtonBig link={`/${pointId}/socials`}>Соц.сети</ButtonBig>
              </div>
            </div>

            {/* Секция с ИНН и ОГРН */}
            <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center text-center" style={{ marginBottom: '15px'}}>
              <p className="text-lg opacity-60">
                <strong>ИНН</strong>: {pointInfo.inn}
              </p>
              <p className="text-lg opacity-60">
                <strong>ОГРН</strong>: {pointInfo.ogrn}
              </p>
              <p className="text-sm opacity-70 break-words whitespace-pre-line leading-snug">
                Удобные инструменты, позволяющие вашему бизнесу быть в курсе и оперативно реагировать на пожелания клиента.
              </p>
            </div>
          </div>




        </>
      )}
    </section>
  );
}

export default dynamic(() => Promise.resolve(Point), {
  ssr: false,
});
