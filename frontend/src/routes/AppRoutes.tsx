import { FC } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import { authRoute, publicRoute } from "src/routes/Routes.ts"
import { useAppSelector } from "src/hooks/useAppSelector"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { setUser } from "src/store/slice/userSlice"
import { useGetPointsQuery, useGetUserQuery } from "src/store/RTKSlice/api"
import { setPoint } from "src/store/slice/pointSlice"

const AppRoutes: FC = ({}) => {
  const token = localStorage.getItem("token")!
  // const authToken = useAppSelector(state => state.userSlice.token)
  const isAuth = useAppSelector((state) => state.userSlice.isAuth)
  const dispatch = useAppDispatch()
  const { data } = useGetUserQuery(token)
  const pointId  = localStorage.getItem('pointId')

  
  if (token !== null) { 
    dispatch(setUser(data))
  } else {
    const { data: point } = useGetPointsQuery(pointId)
    const dispatch = useAppDispatch()
    dispatch(setPoint(point))
  }

  let routes = publicRoute.map(({ path, Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ))
  routes.push(<Route path="*" key={1} element={<Navigate to="/" replace />} />)
  if (isAuth) {
    routes = authRoute.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))
    routes.push(
      <Route path="*" key={2} element={<Navigate to="/points" replace />} />,
    )
  }

  return (
    <div className="container h-full pt-[6vh]">
      <Routes>{routes}</Routes>
    </div>
  )
}

export { AppRoutes }
