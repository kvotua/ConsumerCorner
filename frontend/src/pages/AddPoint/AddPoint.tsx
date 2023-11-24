import { FC } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAddPointMutation } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { Input } from "src/ui/Input/Input"
import { Title } from "src/ui/Title/Title"

const AddPoint: FC = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const token = localStorage.getItem("token")
  const [addPoint] = useAddPointMutation()
  const navigate = useNavigate()
  const onSubmit = async (data: FieldValues) => {
    try {
      const res: any = await addPoint({
        token,
        body: {
          title: data.name,
          address: data.address,
          inn: data.ITN,
          ogrn: data.MSRN,
        },
      })
      if (res.error) {
        alert("что-то пошло не так")
      } else {
        navigate(-1)
      }
    } catch {
      alert("что-то пошло не так")
    }
  }
  return (
    <div>
      <Title title="НОВАЯ ТОЧКА" />
      <form
        className="mt-[8vh]"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="overflow-scroll flex flex-col gap-[32px] mb-[8vh]">
          <Input
            useForm={register("ITN", {
              required: "обязательно для заполнения",
              pattern: /^(?:\d{10}|\d{12})$/,
            })}
            isActive={false}
            title="ИНН юридического лица"
            isError={!!errors?.ITN}
            errorMessage={errors.ITN?.message}
          />
          <Input
            useForm={register("MSRN", {
              required: "обязательно для заполнения",
              pattern: /^(?:\d{13}|\d{13})$/,
            })}
            isActive={false}
            title="ОГРН юридического лица"
            isError={!!errors?.MSRN}
            errorMessage={errors.MSRN?.message}
          />
          <Input
            useForm={register("address", {
              required: "обязательно для заполнения",
            })}
            isActive={false}
            title="Адрес препдприятия "
            isError={!!errors?.address}
            errorMessage={errors.address?.message}
          />
          <Input
            useForm={register("name", {
              required: "обязательно для заполнения",
            })}
            isActive={false}
            title="Название предприятия"
            isError={!!errors?.name}
            errorMessage={errors.name?.message}
          />
        </div>

        <div className="pb-[20px] flex flex-col gap-[10px]">
          <ButtonSubmit isActive title="Добавить точку" type="submit" />
          <ButtonBack />
        </div>
      </form>
    </div>
  )
}

export { AddPoint }
