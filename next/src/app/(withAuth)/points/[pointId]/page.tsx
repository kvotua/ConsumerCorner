"use client";
import { useAppSelector } from "@/root/hooks/useAppSelector";
import { PointScelteton } from "./PointScelteton";
import { useParams, useRouter } from "next/navigation";
import { useGetPointById } from "@/root/services/points";
import { ButtonBig } from "@/shared/Buttons/ButtonBig/ButtonBig";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import dynamic from "next/dynamic";
import { createConfiguration, ServerConfiguration , InnApi , Configuration} from '@/client';
import type { InnApiResultPageInnInnInfoGetRequest } from "@/client/types/ObjectParamAPI";


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
  const baseServer = new ServerConfiguration<{}>("https://consumer-corner.kvotua.ru", {});
  const config = createConfiguration({ baseServer });


  fetchData(config);



  const user = useAppSelector((state) => state.userReduser.user);
  const { pointId } = useParams();

  const pointInfo = {
    title: "Бирхаус",
    who: "ИП АКУЛИЧ В.С",
    address: "г. Калининград\n(Калининградская область),\nулица Ленина, ул. 34 Б"
  }

  // const {
  //   data: point,
  //   isLoading,
  //   isRefetching,
  // } = useGetPointById(pointId as string);
  // const { push } = useRouter();
  const isLoading = false;
  const isRefetching = false;

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
            { pointInfo.who }
          </h2>
          
          <hr className="my-4 border-t-2 border-gray-300 w-5/6" />
          <br></br>
          <h2 className="title">
            { pointInfo.title }
          </h2>
          <p className="opacity-50 break-words whitespace-pre-line leading-tight mb-10">
            {pointInfo.address}
          </p>
          <div className="flex-grow">
            <div className="py-2 grid grid-cols-2 gap-2">
              <ButtonBig link={`/points/${pointId}/book`}>
                Книга отзывов
              </ButtonBig>
              <ButtonBig link={`/points/${pointId}/rights`}>
                Права потребителя
              </ButtonBig>
              <ButtonBig link={`/points/${pointId}/docs`}>Документы</ButtonBig>
              <ButtonBig link={`/points/${pointId}/socials`}>Соц.сети</ButtonBig>
            </div>
          </div>
          <p className="text-xl opacity-50 pt-5 break-words">
            <strong>ИНН</strong>: 1234567890
          </p>
          <p className="text-xl opacity-50 pt-5 break-words">
            <strong>ОГРН</strong>: 1234567890
          </p>
          
          <p className="text-xl opacity-50 pt-5 break-words whitespace-pre-line fs-5">
            Удобные инструменты позволяющие вашему бизнесу быть в курсе и оперативно реагировать на пожелания клиента
          </p>
        </>
      )}
    </section>
  );
}

export default dynamic(() => Promise.resolve(Point), {
  ssr: false,
});
