import { FC, useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { authRoute, publicRoute } from "src/routes/Routes.ts"
import { useAppSelector } from "src/hooks/useAppSelector"
import { IsAuth } from "./IsAuth"
import { useLazyGetPointsQuery } from "src/store/RTKSlice/api"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { setPoint } from "src/store/slice/pointSlice"
import { NotFound } from "src/pages/NotFound/NotFound"

const AppRoutes: FC = () => {
  const user = useAppSelector((state) => state.userSlice.isAuth)
  const pointId = localStorage.getItem("pointId")

  const [getPoint] = useLazyGetPointsQuery()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (pointId) {
      getPoint(pointId).then(({ data }) => {
        dispatch(setPoint(data))
      })
    }
  }, [pointId])
  return (
    <Routes>
      {publicRoute.map(({ Component, path }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {authRoute.map(({ Component, path }) => (
        <Route
          key={path}
          path={path}
          element={
            <IsAuth isAuth={!!user}>
              <Component />
            </IsAuth>
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export { AppRoutes }
