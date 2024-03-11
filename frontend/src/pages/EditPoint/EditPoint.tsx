import { FC } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { usePatchPointMutation } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { ButtonUpload } from "src/ui/ButtonUpload/ButtonUpload"
import { Input } from "src/ui/Input/Input"
import { Title } from "src/ui/Title/Title"
import { axiosBase } from "src/axios"
import { useAppSelector } from "src/hooks/useAppSelector" 

interface IPoint {
  ITN: string
  MSRN: string
  address: string
  name: string
  phone: string
  acc: FileList
  jurnal: FileList
  license: FileList
}
const EditPoint: FC = () => {
  const [editPoint] = usePatchPointMutation()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const { pointId } = useParams()
  const point = useAppSelector((state) => state.pointSlice)
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      ITN: point.inn,
      MSRN: point.ogrn,
      address: point.address,
      name: point.title,
      phone: "+79052418161",
      acc: "123",
      jurnal: point.audit_log_file_id,
      license: point.license_file_ids,
    },
  })

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    return await axiosBase.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
  const submit = async (data: FieldValues | IPoint) => {
    try {
      const jurnal = await uploadFile(data.jurnal[0])
      const license = await uploadFile(data.license[0])
      const acc = await uploadFile(data.acc[0])
      if (token && pointId) {
        await editPoint({
          token,
          pointId,
          body: {
            title: data.name,
            address: data.address,
            phone_number: data.phone,
            inn: data.ITN,
            ogrn: data.MSRN,
            audit_log_file_id: jurnal.data,
            license_file_ids: [license.data],
            accreditation_file_ids: [acc.data],
          },
        }).then((res) => {
          if ("error" in res) throw res.error
          navigate("/points")
        })
      }
    } catch (error) {
      console.error("Error uploading files", error)
    }
  }
  return (
    <div className="container pt-8">
      <Title title={point.title} />
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
            type="phone"
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
        </div>
        <div className="pb-[20px] flex flex-col gap-[10px]">
          {isDirty && <ButtonSubmit isActive title="Сохранить" type="submit" />}
          <ButtonBack />
        </div>
      </form>
    </div>
  )
}

export { EditPoint }
