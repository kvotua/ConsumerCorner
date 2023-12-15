import { FC } from "react"
import { FieldValues, useForm } from "react-hook-form"

import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { ButtonUpload } from "src/ui/Buttons/ButtonUpload/ButtonUpload"
import { Input } from "src/ui/Input/Input"
import { TitlePoint } from "src/ui/Title/TitlePoint"

const EditPoint: FC = ({}) => {
  const { title, address, inn, ogrn } = useAppSelector(
    (state) => state.pointSlice,
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data)
    } catch {
      alert("что-то пошло не так")
    }
  }
  return (
    <div className="flex flex-col h-full">
      <TitlePoint pointName={title} title="РЕДАКТИРОВАНИЕ" />
      <form className="" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="overflow-scroll flex flex-col gap-[32px] mt-[20px] mb-[20px]">
          <div className="grid grid-cols-2 gap-[10px]">
            <Input
              useForm={register("ITN", {
                required: "обязательно для заполнения",
                pattern: /^(?:\d{10}|\d{12})$/,
              })}
              isActive={false}
              title="ИНН"
              defaultValue={inn}
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
              defaultValue={ogrn}
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
            defaultValue={address}
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
            title="Телефон предприятия"
            isError={!!errors?.phone}
            errorMessage={errors.phone?.message}
          />
          <div className="">
            <span className="title !text-start block mb-[20px]">Документы</span>
            <div className=" flex flex-col gap-[10px]">
              <ButtonUpload
                useForm={register("jurnal", {
                  required: "этот файл обязателен",
                })}
                title="Журнал учета проверок"
                typeFile=".pdf"
                isError={!!errors.jurnal}
                id="jurnal"
              />
              <ButtonUpload
                useForm={register("license", {
                  required: "этот файл обязателен",
                })}
                title="Лицензии"
                isMultiple
                typeFile=".pdf"
                isError={!!errors.license}
                id="license"
              />
              <ButtonUpload
                useForm={register("accreditation", {
                  required: "этот файл обязателен",
                })}
                title="Свидетельства об аккредитации"
                typeFile=".pdf"
                isError={!!errors.accreditation}
                id="accreditation"
              />
              <ButtonUpload
                useForm={register("Certificates", {
                  required: "этот файл обязателен",
                })}
                title="Сертификаты"
                typeFile=".pdf"
                isError={!!errors.Certificates}
                id="Certificates"
              />
            </div>
          </div>
        </div>

        <div className="pb-[20px] flex flex-col gap-[10px]">
          <ButtonSubmit isActive title="Добавить точку" type="submit" />
          <ButtonBack />
        </div>
      </form>
    </div>
  )
}

export default EditPoint
