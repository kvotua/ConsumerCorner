import { FC } from "react"
import { useAppSelector } from "src/hooks/useAppSelector"
import { ButtonLong } from "src/ui/Buttons/ButtonLong/ButtonLong"

const List: FC = () => {
  const { audit_log_file_id } = useAppSelector((state) => state.pointSlice)
  const { accreditation_file_ids } = useAppSelector((state) => state.pointSlice)
  const { license_file_ids } = useAppSelector((state) => state.pointSlice)

  return (
    <ul className="flex flex-col gap-[20px]">
      <li>
        <ButtonLong
          link={`http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/files/${audit_log_file_id}`}
          title="Журнал учета проверок"
        />
      </li>

      <li>
        <ButtonLong
          link={`http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/files/${accreditation_file_ids}`}
          title="Аккредитация"
        />
      </li>

      <li>
        <ButtonLong
          link={`http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/files/${license_file_ids}`}
          title="Лицензия"
        />
      </li>
    </ul>
  )
}

export { List }
