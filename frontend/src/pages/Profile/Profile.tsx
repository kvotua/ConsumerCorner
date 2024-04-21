import { Cookies } from "react-cookie";
import { useAppDispatch } from "src/app/hooks/useAppDispatch";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { useBalance } from "src/app/services/user.service";
import { setUser } from "src/app/store/slices/userSlice";
import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { InfoField } from "src/shared/InfoField/InfoField";


const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.userReduser.user);
  const dispatch = useAppDispatch();
  const { mutate } = useBalance();
  const alert = () => {
    const price = prompt("Пополнить баланс:");
    if (price && user) {
      mutate({ token: user.id, price: +price });
    }
  };
  return (
    <section className="wrapper">
      <div className="flex flex-col justify-center items-center">
        <div className="w-20 h-20 rounded-full">
          <img src="/profile.svg" alt="profile" />
        </div>
        <span className="text-2xl pt-2">{user?.name}</span>
      </div>
      <div className="flex-grow flex flex-col gap-8 py-5">
        <InfoField info={`${user?.login}`} titleInfo="Логин" />
        <InfoField info={`${user?.name} ${user?.surname}`} titleInfo="ФИО" />
        <InfoField info={`${user?.email}`} titleInfo="Эл. почта" />
        <div className="flex justify-between items-center">
          <InfoField info={`${user?.balance} р.`} titleInfo="Баланс" />
          <span className="font-bold" onClick={alert}>
            Пополнить
          </span>
        </div>
      </div>
      <div className="buttons">
        <div className="flex gap-2">
          <ButtonBase
            handleClick={() => {
              dispatch(setUser(null));
              new Cookies().remove("token");
            }}
          >
            Выйти
          </ButtonBase>
          <ButtonBase link="edit">Изменить</ButtonBase>
        </div>
        <ButtonBack />
      </div>
    </section>
  );
};

export { Profile };
