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
  const pointId = localStorage.getItem("pointId")
  const { data: userData, error: userError } = useGetUserQuery(token && token)
  const { data: pointData, error: pointError } = useGetPointsQuery(pointId)

  useEffect(() => {
    if (token !== null && userData) {
      dispatch(setUser(userData))
    } else if (pointId && pointData) {
      dispatch(setPoint(pointData))
    }
  }, [token, pointId, userData, pointData, userError, pointError])

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
