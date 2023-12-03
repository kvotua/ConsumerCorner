import { FC, useEffect, useState } from "react"

import { PointItem } from "src/Components/PointItem/PointItem"
import { useAppSelector } from "src/hooks/useAppSelector"
import { useLazyGetPointsQuery } from "src/store/RTKSlice/api"
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack"
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"
import { Loader } from "src/ui/Loader/Loader"
import { Title } from "src/ui/Title/Title"

interface IPoints {
  title: string
  address: string
  id: string
  owner: string
}

const Points: FC = ({}) => {
  const pointsId = useAppSelector((state) => state.userSlice.points_id)
  const [points, setPoints] = useState<IPoints[]>([])

  const [trigger, { isLoading }] = useLazyGetPointsQuery()
  useEffect(() => {
    const fetchPoints = pointsId.map(async (id: string) => {
      const { data: point } = await trigger(id)
      return point
    })
    Promise.all(fetchPoints).then((point) => setPoints(point))
  }, [pointsId])

  return (
    <div className="flex flex-col h-full">
      <Title title="МОИ ТОЧКИ" />
      <ul className="mt-[8vh] h-[55vh] overflow-scroll flex flex-col gap-[50px] mb-[20px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <Loader />
            <span className="text-white text-15px">Загрузка</span>
          </div>
        ) : (
          points.map(({ address, id }) => (
            <li key={id}>
              <PointItem address={address} pointId={id} />
            </li>
          ))
        )}
      </ul>
      <div className="flex-grow"></div>
      <div className=" flex flex-col gap-[10px] pb-[10px]">
        <div className="flex gap-[10px]">
          <ButtonLink isActive title="Добавить точку" link="add" />
          <ButtonLink isActive title="Мой профиль" link="/profile" />
        </div>
        <ButtonBack />
      </div>
    </div>
  )
}

export { Points }
