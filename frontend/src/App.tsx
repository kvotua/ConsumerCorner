import { useEffect } from "react"
// import device from "current-device"

import { AppRoutes } from "src/routes/AppRoutes"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { getUser } from "./store/slice/userSlice"
// import { DesktopPage } from "./pages/DesktopPage/DesktopPage"

function App() {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem("token")
  if (token === "undefined" || token === "null") {
    localStorage.removeItem("token")
  }
  useEffect(() => {
    if (token) {
      dispatch(getUser(token))
    }
  }, [token])

  // if (window.innerWidth > 1024 || device.desktop()) {
  //   return <DesktopPage />
  // }

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
