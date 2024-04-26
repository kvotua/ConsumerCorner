import { useNavigate, useParams } from "react-router-dom";
import { useGetPointById } from "src/app/services/points.service";
import { PointScelteton } from "./PointScelteton";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { ButtonBig } from "src/shared/Buttons/ButtonBig/ButtonBig";

const Point: React.FC = () => {
  const user = useAppSelector((state) => state.userReduser.user);
  const { pointId } = useParams();
  const { data: point, isLoading, isRefetching } = useGetPointById(pointId!);
  const navigate = useNavigate();

  return (
    <section className="wrapper">
      {isLoading || isRefetching ? (
        <PointScelteton />
      ) : (
        <>
          <h2 className="title">
            {user && !user.points_id.includes(pointId!)
              ? point?.title
              : "моя точка"}
          </h2>
          <p className="text-xl opacity-50 pt-5 break-words">
            {point?.address}
          </p>
          <div className="flex-grow">
            <div className="py-2 grid grid-cols-2 gap-2">
              <ButtonBig link="book">Книга отзывов</ButtonBig>
              <ButtonBig link="rights">Права потребителя</ButtonBig>
              <ButtonBig link="docs">Документы</ButtonBig>
              <ButtonBig link="socials">Соц.сети</ButtonBig>
              <ButtonBig link="info">О точке</ButtonBig>
              {user && <ButtonBig link="reviews">Отзывы</ButtonBig>}
            </div>
          </div>
        </>
      )}
      <div className="buttons">
        {user && user.points_id.includes(pointId!) && (
          <div className="flex gap-2">
            <ButtonBase link="edit">Изменить точку</ButtonBase>
            <ButtonBase link="qr">qr-код</ButtonBase>
          </div>
        )}
        <ButtonBack handleClick={() => navigate("/")}>
          {user && !user.points_id.includes(pointId!) && "На главную"}
        </ButtonBack>
      </div>
    </section>
  );
};

export default Point;
