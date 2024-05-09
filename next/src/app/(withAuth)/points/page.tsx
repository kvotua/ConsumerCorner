"use client";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { useAppSelector } from "@/root/hooks/useAppSelector";
import { toast } from "react-toastify";
import PointsList from "./pointsList";

export default function Points() {
  const user = useAppSelector((state) => state.userReduser.user);
  return (
    <section className="wrapper container">
      <h2 className="title sticky top-0 bg-fillColor block">Мои точки</h2>
      <div className="flex-grow">
        <PointsList />
      </div>

      <div className="buttons">
        <ButtonBase
          link={user?.balance! >= 100 ? "points/add/1" : ""}
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
        <ButtonBase isActive={false} link={`/profile/${user?.id}`}>
          Профиль
        </ButtonBase>
      </div>
    </section>
  );
}
