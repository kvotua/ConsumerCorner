import { Link } from "react-router-dom"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { useAppSelector } from "src/hooks/useAppSelector"
import { removeUser } from "src/store/slice/userSlice"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { Input } from "src/ui/Input/Input"

const Profile = () => {
  const { balance, login, name, surname } = useAppSelector(
    (state) => state.userSlice,
  )
  const rubles = balance / 100
  const dispatch = useAppDispatch()
  return (
    <div className="h-full flex flex-col container pt-8">
      <div className="flex justify-center items-center">
        <div className="w-[100px] h-[100px] bg-white rounded-[50%] "></div>
      </div>

      <div className="mb-[20px] flex-grow flex flex-col gap-4 pt-4">
        <Input title="Логин" value={login} disabled={true} />
        <Input title="Имя" value={name} disabled={true} />
        <Input title="Фамилия" value={surname} disabled={true} />
        <div className="flex justify-between items-center mt-4 mb-8">
          <span className="text-18px text-white font-bold block">
            Баланс: {rubles} ₽
          </span>
          <Link to={"payments"} className="text-white font-bold">
            Пополнить
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[10px] pb-4">
        <ButtonSubmit
          title="Выйти"
          type="button"
          isActive
          handlClick={() => {
            dispatch(removeUser())
            localStorage.removeItem("token")
          }}
        />
        <ButtonLink title="Редактировать" link="edit" />
        <ButtonBack className="col-span-2" />
      </div>
    </div>
  )
}

export { Profile }
