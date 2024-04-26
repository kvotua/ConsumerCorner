import { Suspense } from "react";
import { RootRouting } from "./app/routing/RootRouting";
import "react-toastify/dist/ReactToastify.css";
import { NewUser } from "src/pages/NewUser/NewUser";
import { useCookies } from "react-cookie";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "./widgets/Preloader/Preloader";
function App() {
  const [cookies] = useCookies();
  return (
    <>
      <AnimatePresence>
        {!cookies.visited ? (
          <NewUser />
        ) : (
          <Suspense fallback={<Preloader />}>
            <RootRouting />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
