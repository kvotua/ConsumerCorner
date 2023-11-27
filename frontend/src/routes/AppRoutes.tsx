import { FC, useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import { authRoute, publicRoute } from "src/routes/Routes.ts"
import { useAppSelector } from "src/hooks/useAppSelector"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { setUser } from "src/store/slice/userSlice"
import { useGetPointsQuery, useGetUserQuery } from "src/store/RTKSlice/api"
import { setPoint } from "src/store/slice/pointSlice"

const AppRoutes: FC = () => {
  const token = localStorage.getItem("token")!
  const isAuth = useAppSelector((state) => state.userSlice.isAuth)
  const dispatch = useAppDispatch()
  const { data: userData } = useGetUserQuery(token)
  const pointId = localStorage.getItem("pointId")
  const { data: pointData } = useGetPointsQuery(pointId)

  useEffect(() => {
    if (token !== null) {
      dispatch(setUser(userData))
    } else if (pointId) {
      dispatch(setPoint(pointData))
    }
  }, [token, pointId, userData, pointData])

  const routes = isAuth
    ? authRoute.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))
    : publicRoute.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))

  routes.push(
    <Route
      path="*"
      key={isAuth ? 2 : 1}
      element={<Navigate to={isAuth ? "/points" : "/"} replace />}
    />,
  )

  return (
    <div className="container h-full pt-[6vh]">
      <Routes>{routes}</Routes>
    </div>
  )
}

export { AppRoutes }
