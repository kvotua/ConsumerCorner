import { FC } from "react"
import { Route, Routes } from "react-router-dom"

import { authRoute, publicRoute } from "src/routes/Routes.ts"
import { useAppSelector } from "src/hooks/useAppSelector"
import { IsAuth } from "./IsAuth"

const AppRoutes: FC = () => {
  const user = useAppSelector((state) => state.userSlice.isAuth)
  return (
    <Routes>
      {publicRoute.map(({ Component, path }) => (
        <Route path={path} element={<Component />} />
      ))}
      {authRoute.map(({ Component, path }) => (
        <Route
          path={path}
          element={
            <IsAuth isAuth={!!user}>
              <Component />
            </IsAuth>
          }
        />
      ))}
    </Routes>
  )
}

export { AppRoutes }
