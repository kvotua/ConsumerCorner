import { FC } from "react"
import { FieldValues, useForm } from "react-hook-form"
// import { useNavigate, useParams } from "react-router-dom"

// import { usePatchPointMutation } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { ButtonUpload } from "src/ui/Buttons/ButtonUpload/ButtonUpload"
import { Title } from "src/ui/Title/Title"

const AddDocs: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //   const token = localStorage.getItem("token")
  //   const { pointId } = useParams()
  //   const [patchPoint] = usePatchPointMutation()
  //   const navigate = useNavigate()
  const onSubmit = (data: FieldValues) => {
    console.log(data)

    // patchPoint({
    //   token,
    //   pointId,
    //   body: {
    //     address: `${data.city} ${data.region} ${data.street} ${data.house} ${data.housing}`,
    //   },
    // }).then(() => {
    //   navigate(-1)
    // })
  }
  const onClick = () => {
    handleSubmit((data) => onSubmit(data))()
  }
  return (
    <div className="flex flex-col h-full">
      <Title title="ДОБАВИТЬ ДОКУМЕНТЫ" />
      <form className="flex flex-col flex-grow gap-[20px] mt-[40px] mb-[40px]">
        <ButtonUpload
          useForm={register("jurnal", { required: "этот файл обязателен" })}
          title="Журнал учета проверок"
          typeFile=".pdf"
          isError={!!errors.jurnal}
          id="jurnal"
        />
        <ButtonUpload
          useForm={register("license", { required: "этот файл обязателен" })}
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
      </form>
      <div className=" flex flex-col gap-[10px] pb-[10px]">
        <ButtonSubmit
          isActive
          title="Сохранить"
          type="submit"
          handlClick={onClick}
        />
        <ButtonBack />
      </div>
    </div>
  )
}

export { AddDocs }
