import { Navigate, Route, Routes } from "react-router-dom";
import { authUserRoutes, publicRoutes } from "./Routes";

interface IRoute {
  path: string;
  Component: () => JSX.Element;
}

const AppRoutes = () => {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }: IRoute) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {token &&
        authUserRoutes.map(({ path, Component }: IRoute) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRoutes };
