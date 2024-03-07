import { useState } from "react"
import { axiosBase } from "src/axios"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { useAppSelector } from "src/hooks/useAppSelector"
import { setUser } from "src/store/slice/userSlice"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { Input } from "src/ui/Input/Input"

const ProfileEdit = () => {
  const { login, name, surname } = useAppSelector((state) => state.userSlice)
  const token = localStorage.getItem("token")
  const [value, setValue] = useState({
    login,
    name,
    surname,
  })
  const editUser = () => {
    try {
      axiosBase.patch(`proprietors?token=${token}`, value)
    } catch (error) {
      console.log(error)
    }
  }
  const dispatch = useAppDispatch()
  return (
    <div className="h-full flex flex-col container pt-8">
      <div className="w-[100px] h-[100px] bg-white rounded-[50%] mx-auto"></div>
      <span className="inline-block mx-auto text-white font-bold pt-2">
        Изменить фото
      </span>
      <div className="mb-[20px] flex-grow flex flex-col gap-4 pt-4">
        {/* <Input
          title="Логин"
          value={value.login}
          onChange={(e) => setValue({ ...value, login: e.currentTarget.value })}
        /> */}
        <Input
          title="Имя"
          value={value.name}
          onChange={(e) => setValue({ ...value, name: e.currentTarget.value })}
        />
        <Input
          title="Фамилия"
          value={value.surname}
          onChange={(e) =>
            setValue({ ...value, surname: e.currentTarget.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-[10px] pb-4">
        <ButtonSubmit
          title="Сохранить"
          type="button"
          isActive
          handlClick={() => {
            editUser()
            dispatch(setUser(value))
          }}
        />
        <ButtonSubmit
          title="Выйти"
          type="button"
          isActive
          handlClick={() => {
            localStorage.removeItem("token")
          }}
        />
        <ButtonBack className="col-span-2" />
      </div>
    </div>
  )
}

export { ProfileEdit }
