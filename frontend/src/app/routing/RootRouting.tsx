import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "./RootRoutes";
import { IsAuth } from "./IsAuth";

const RootRouting: React.FC = () => {
   return (
    <main className="container">
      <Routes>
        {publicRoutes.map(({ Element, path }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        {authRoutes.map(({ Element, path }) => (
          <Route
            key={path}
            path={path}
            element={
              <IsAuth>
                <Element />
              </IsAuth>
            }
          />
        ))}
      </Routes>
    </main>
  );
};

export { RootRouting };
