import { FC } from "react"
import { Link, useParams } from "react-router-dom"
import { useGetPointsQuery } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"
import { Input } from "src/ui/Input/Input"
import { Title } from "src/ui/Title/Title"

const Point: FC = ({}) => {
  const token = localStorage.getItem("token")
  const { pointId } = useParams()
  const { data: point } = useGetPointsQuery(pointId)
  localStorage.setItem("pointId", pointId ? pointId : "")
  return (
    <div className="flex flex-col h-full">
      <Title title={token ? "МОЯ ТОЧКА" : "ТОЧКА"} />
      <div className="mt-[8vh] mb-[20px]">
        <address className="text-18px font-medium text-white opacity-70">
          {point?.address}
        </address>
        {token && (
          <div className=" flex justify-between">
            <Link to={`addDocs`} className="text-white font-bold text-15px">
              изменить документ
            </Link>
            <Link to={`qr`} className="text-white font-bold text-15px">
              qr-код
            </Link>
          </div>
        )}
        <div className="mt-[4vh] flex flex-col gap-[32px]">
          <Input
            isActive={false}
            title="ИНН юридического лица"
            defaultValue={point?.inn}
          />
          <Input
            isActive={false}
            title="ОГРН юридического лица"
            defaultValue={point?.ogrn}
          />
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex flex-col gap-[10px] pb-[10px]">
        {token ? (
          <>
            <div className="flex gap-[10px]">
              <ButtonLink isActive title="Изменить" link="editPoint" />
              <ButtonLink isActive title="Отзывы" link="reviews" />
            </div>
            <ButtonBack />
          </>
        ) : (
          <>
            <ButtonLink isActive title="Перейти к документам" link="menu" />
            <ButtonBack />
          </>
        )}
      </div>
    </div>
  )
}

export { Point }
