import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { PointsList } from "./PointsList";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { useAppSelector } from "src/app/hooks/useAppSelector";

const Points: React.FC = () => {
  const user = useAppSelector((state) => state.userReduser.user);
  return (
    <section className="wrapper">
      <h2 className="title sticky top-0 bg-fillColor block">Мои точки</h2>
      {user && user?.points_id.length > 0 ? (
        <PointsList />
      ) : (
        <span className="flex-grow flex justify-center items-center text-4xl text-center font-bold ">
          У вас пока нет точек
        </span>
      )}
      <div className="buttons">
        <div className="flex gap-2">
          <ButtonBase link="add">Добавить точку</ButtonBase>
          <ButtonBase link="/profile">Профиль</ButtonBase>
        </div>
        <ButtonBack />
      </div>
    </section>
  );
};

export { Points };
