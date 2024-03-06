import { Navigate } from "react-router-dom"

const IsAuth = ({
  children,
  isAuth,
}: {
  children: React.ReactNode
  isAuth: boolean
}) => {
  if (!isAuth) return <Navigate to={"/"} />
  return children
}

export { IsAuth }
