import { AppRoutes } from "src/routes/AppRoutes"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useEffect } from "react"
import { getUser } from "./store/slice/userSlice"

function App() {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      dispatch(getUser(token))
    }
  }, [token])
  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
