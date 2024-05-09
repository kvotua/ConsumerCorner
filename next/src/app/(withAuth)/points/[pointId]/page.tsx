"use client";
import { useAppSelector } from "@/root/hooks/useAppSelector";
import { PointScelteton } from "./PointScelteton";
import { useParams, useRouter } from "next/navigation";
import { useGetPointById } from "@/root/services/points";
import { ButtonBig } from "@/shared/Buttons/ButtonBig/ButtonBig";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import dynamic from "next/dynamic";

function Point() {
  const user = useAppSelector((state) => state.userReduser.user);
  const { pointId } = useParams();

  const {
    data: point,
    isLoading,
    isRefetching,
  } = useGetPointById(pointId as string);
  const { push } = useRouter();

  return (
    <section className="wrapper container">
      {isLoading || isRefetching ? (
        <PointScelteton />
      ) : (
        <>
          <h2 className="title">
            {user && !user.points_id.includes(pointId as string)
              ? point?.title
              : "моя точка"}
          </h2>
          <p className="text-xl opacity-50 pt-5 break-words">
            {point?.address}
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
              <ButtonBig link={`/points/${pointId}/info`}>О точке</ButtonBig>
              {user && <ButtonBig link={`/points/${pointId}/reviews`}>Отзывы</ButtonBig>}
            </div>
          </div>
        </>
      )}
      <div className="buttons">
        {user && user.points_id.includes(pointId as string) && (
          <div className="flex gap-2">
            <ButtonBase link={`/points/${pointId}/edit`}>Изменить точку</ButtonBase>
            <ButtonBase link={`/points/${pointId}/qr`}>qr-код</ButtonBase>
          </div>
        )}
        <ButtonBack handleClick={() => push("/")}>
          {user && !user.points_id.includes(pointId as string) && "На главную"}
        </ButtonBack>
      </div>
    </section>
  );
}

export default dynamic(() => Promise.resolve(Point), {
  ssr: false,
});
