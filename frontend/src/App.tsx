import { useEffect, useState } from "react";
import { useAppSelector } from "./app/hooks/useAppSelector";
import { RootRouting } from "./app/routing/RootRouting";
import "react-toastify/dist/ReactToastify.css";
import { Preloader } from "./widgets/Preloader/Preloader";
function App() {
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.userReduser.user);
  useEffect(() => {
    if (user) {
      setTimeout(() => setLoading(false), 2000);
    } else {
      setTimeout(() => setLoading(false), 2000);
    }
  }, [user]);
  return <>{!loading ? <RootRouting /> : <Preloader />}</>;
}

export default App;
