import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { removeUser } from "src/store/slice/userSlice";
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack";
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink";
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit";
import { Input } from "src/ui/Input/Input";

const Profile = () => {
  const { balance, login, name, surname } = useAppSelector(
    (state) => state.userSlice
  );
  const dispatch = useAppDispatch()
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[100px] bg-white rounded-[50%]"></div>
        <span>Изменить фото</span>
      </div>
      <div className="h-[55vh] overflow-scroll">
        <div className="">
          <Input title="Логин" value={login} />
          <Input title="Имя" value={name} />
          <Input title="Фамилия" value={surname} />
          <span className="text-18px text-white font-bold mt-[20px] block">
            Баланс: {balance}
          </span>
        </div>
        <div className="flex gap-[10px] mt-[20px]">
          <ButtonLink isActive title="Пополнить Баланс" link="payments" />
          <ButtonLink title="Редактировать" link="edit" />
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
        <ButtonSubmit
          title="Выйти"
          type="button"
          isActive
          handlClick={() => {
            dispatch(removeUser())
            localStorage.removeItem("token")
          }}
        />
        <ButtonBack />
      </div>
    </div>
  );
};

export { Profile };
