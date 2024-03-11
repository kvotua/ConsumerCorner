import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit"
import { TitlePoint } from "src/ui/Title/TitlePoint"
import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonLong } from "src/ui/Buttons/ButtonLong/ButtonLong"

const Docs = () => {
  const token = localStorage.getItem("token")
  const { title, audit_log_file_id, accreditation_file_ids, license_file_ids } =
    useAppSelector((state) => state.pointSlice)

  return (
    <div className="flex flex-col h-full container pt-8">
      <TitlePoint title="Документы" pointName={title} />

      <div className="flex-grow mb-[20px] mt-[20px]">
        <ul className="flex flex-col gap-[20px]">
          <li>
            <ButtonLong
              link={`http://192.168.0.5:8000/files/${audit_log_file_id}`}
              title="Журнал учета проверок"
            />
          </li>

          <li>
            <ButtonLong
              link={`http://192.168.0.5:8000/files/${accreditation_file_ids}`}
              title="Аккредитация"
            />
          </li>

          <li>
            <ButtonLong
              link={`http://192.168.0.5:8000/files/${license_file_ids}`}
              title="Лицензия"
            />
          </li>
        </ul>
      </div>

      <div className="pb-4 flex flex-col gap-[10px]">
        {token ? (
          <ButtonSubmit title="Загрузить документ PDF" type="submit" isActive />
        ) : (
          <ButtonSubmit title="Скачать документы PDF" type="button" isActive />
        )}
        <ButtonBack />
      </div>
    </div>
  )
}

export { Docs }
