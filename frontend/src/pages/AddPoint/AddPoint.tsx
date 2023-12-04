import { FC } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAddPointMutation } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { ButtonUpload } from "src/ui/ButtonUpload/ButtonUpload"
import { Input } from "src/ui/Input/Input"
import { Title } from "src/ui/Title/Title"
import { onSubmit } from "./api"

const AddPoint: FC = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  
  } = useForm()
  const [addPoint] = useAddPointMutation()
  const navigate = useNavigate()
  const submit = (data: FieldValues) => {
    const formData = new FormData()
    formData.append('file', data.acc[0])
    formData.append('file', data.acc[0])
    formData.append('file', data.acc[0])
    
    // onSubmit(data, addPoint, navigate)
  }
  return (
    <div>
      <Title title="НОВАЯ ТОЧКА" />
      <form
        className="mt-[8vh]"
        onSubmit={handleSubmit((data) => submit(data))}
      >
        <div className="overflow-scroll flex flex-col gap-[32px] mb-[8vh]">
          <div className="grid grid-cols-2 gap-[32px]">
            <Input
              useForm={register("ITN", {
                required: "обязательно для заполнения",
                pattern: /^(?:\d{10}|\d{12})$/,
              })}
              isActive={false}
              title="ИНН"
              isError={!!errors?.ITN}
              errorMessage={errors.ITN?.message}
            />
            <Input
              useForm={register("MSRN", {
                required: "обязательно для заполнения",
                pattern: /^(?:\d{13}|\d{13})$/,
              })}
              isActive={false}
              title="ОГРН"
              isError={!!errors?.MSRN}
              errorMessage={errors.MSRN?.message}
            />
          </div>
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
          <Input
            useForm={register("phone", {
              required: "Телефон",
            })}
            isActive={false}
            title="Номер телефона"
            isError={!!errors?.phone}
            errorMessage={errors.phone?.message}
          />
        </div>
        <span className="title">Загрузите документы</span>
        <div className="flex flex-col gap-[32px] my-[40px]">
          <ButtonUpload
            title="Журнал учета проверок"
            isError={!!errors.jurnal?.message}
            errorMessage={errors.jurnal?.message}
            useForm={register("jurnal", { required: "Загрузите документ" })}
            id="jurnal"
          />
          <ButtonUpload
            title="Лицензии"
            isError={!!errors.license?.message}
            errorMessage={errors.license?.message}
            useForm={register("license", { required: "Загрузите документ" })}
            id="license"
          />
          <ButtonUpload
            title="Свидетельство об аккредитации"
            isError={!!errors.acc?.message}
            errorMessage={errors.acc?.message}
            useForm={register("acc", { required: "Загрузите документ" })}
            id="acc"
          />
          {/* <ButtonUpload
            title="Сертификаты"
            isError={!!errors.Certificates?.message}
            errorMessage={errors.Certificates?.message}
            useForm={register("Certificates", {
              required: "Загрузите документ",
            })}
            id="Certificates"
          /> */}
        </div>
        {/* <span className="title">Режим работы</span>
        <div className="grid grid-cols-2 gap-[32px] my-[40px]">
          <Input title="Начало рабочего дня" isActive={false} />
          <Input title="Конец рабочего дня" isActive={false} />
        </div> */}
        <div className="pb-[20px] flex flex-col gap-[10px]">
          <ButtonSubmit isActive title="Добавить точку" type="submit" />
          <ButtonBack />
        </div>
      </form>
    </div>
  )
}

export { AddPoint }
