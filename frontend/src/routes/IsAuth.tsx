import { Navigate } from "react-router-dom"

const IsAuth = ({
  children,
  isAuth,
}: {
  children: React.ReactNode
  isAuth: boolean
}) => {
  const token = localStorage.getItem("token")
  if (!isAuth && !token) return <Navigate to={"/"} />
  return children
}

export { IsAuth }
