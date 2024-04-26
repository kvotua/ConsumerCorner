import { PointsList } from "./PointsList";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { toast } from "react-toastify";

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
        <ButtonBase
          link={user?.balance! >= 100 ? "add/step/1" : ""}
          handleClick={() => {
            if (user?.balance! <= 100) {
              toast.warn(
                "У вас недостаточно средств для создания точки. Перейдите в профиль что бы пополнить"
              );
            }
          }}
        >
          Добавить точку
        </ButtonBase>
        <ButtonBase isActive={false} link="/profile">
          Профиль
        </ButtonBase>
      </div>
    </section>
  );
};

export default Points;
