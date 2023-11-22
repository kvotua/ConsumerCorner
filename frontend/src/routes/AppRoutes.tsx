import { FC } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import { authRoute, publicRoute } from "./routes"
import { useAppSelector } from "src/hooks/useAppSelector"
import { useAppDispatch } from "src/hooks/useAppDispatch"
import { setUser } from "src/store/slice/userSlice"
import { useGetUserQuery } from "src/store/RTKSlice/api"

const AppRoutes: FC = ({}) => {
  const token = localStorage.getItem("token")! 
  // const authToken = useAppSelector(state => state.userSlice.token)
  const isAuth = useAppSelector((state) => state.userSlice.isAuth)
  const dispatch = useAppDispatch()
  const { data } = useGetUserQuery(token)

  if (token !== null) {
    dispatch(setUser(data))
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
    <div className="container pt-[6vh]">
      <Routes>{routes}</Routes>
    </div>
  )
}

export { AppRoutes }
