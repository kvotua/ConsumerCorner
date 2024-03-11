import { AnimatePresence, motion } from "framer-motion"
import { FC, useEffect, useState } from "react"
import { PointItem } from "src/Components/PointItem/PointItem"

import { useAppSelector } from "src/hooks/useAppSelector"
import { useLazyGetPointsQuery } from "src/store/RTKSlice/api"
import { ButtonLink } from "src/ui/Buttons/ButtonLink/ButtonLink"
import { Loader } from "src/ui/Loader/Loader"
import { Title } from "src/ui/Title/Title"

interface IPoints {
  title: string
  address: string
  phone_number: string
  inn: string
  ogrn: string
  audit_log_file_id: string
  license_file_ids: string[]
  accreditation_file_ids: string[]
  id: string
  owner: string
}

const Points: FC = () => {
  const pointsIds = useAppSelector((state) => state.userSlice.points_id)
  const [points, setPoints] = useState<IPoints[]>([])
  const [trigger, { isLoading }] = useLazyGetPointsQuery()
  useEffect(() => {
    if (pointsIds) {
      const fetchPoints = pointsIds.map(async (id: string) => {
        const { data: point } = await trigger(id)
        return point
      })
      Promise.all(fetchPoints).then((point) => setPoints(point))
    }
  }, [pointsIds])

  return (
    <div className="flex flex-col h-full container pt-8">
      <Title title="МОИ ТОЧКИ" />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <Loader />
          <span className="text-white text-15px">Загрузка</span>
        </div>
      ) : (
        <>
          {points.length === 0 ? (
            <div className="mt-[8vh] flex-grow flex justify-center items-center">
              <span className="text-18px text-white font-bold">
                У вас пока нет точек
              </span>
            </div>
          ) : (
            <ul className="mt-[8vh] h-[55vh] overflow-scroll flex flex-col gap-[50px] mb-[20px] flex-grow">
              <AnimatePresence>
                {points?.map(({ address, id }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <PointItem address={address} pointId={id} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </>
      )}

      <div className="flex flex-col gap-4 pb-4">
        <ButtonLink isActive title="Добавить точку" link="add" />
        <ButtonLink title="Мой профиль" link="/profile" />
      </div>
    </div>
  )
}

export { Points }
