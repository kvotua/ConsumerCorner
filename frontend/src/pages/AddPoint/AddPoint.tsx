import { FC } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAddPointMutation } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { ButtonUpload } from "src/ui/ButtonUpload/ButtonUpload"
import { Input } from "src/ui/Input/Input"
import { Title } from "src/ui/Title/Title"
import { axiosBase } from "src/axios"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { getUser } from "src/store/slice/userSlice"

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
const AddPoint: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [addPoint] = useAddPointMutation()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")!
  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    return await axiosBase.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
  const dispatch = useAppDispatch()
  const submit = async (data: FieldValues | IPoint) => {
    try {
      const jurnal = await uploadFile(data.jurnal[0])
      const license = await uploadFile(data.license[0])
      const acc = await uploadFile(data.acc[0])

      await addPoint({
        token,
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
        dispatch(getUser(token))

        navigate("/points")
      })
    } catch (error) {
      console.error("Error uploading files", error)
    }
  }
  return (
    <div className="container">
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
