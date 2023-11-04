import { Navigate, Route, Routes } from "react-router-dom";
import { authUserRoutes, publicRoutes } from "./Routes";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setToken } from "../store/Slices/token";

interface IRoute {
    path: string;
    Component: any;
}

const AppRoutes = () => {
    const tok = localStorage.getItem("token");
    const token = useAppSelector((state) => state.tokenSlice.token);
    const dispatch = useAppDispatch();

    if (tok) {
        dispatch(setToken(tok));
    }
    let routes = publicRoutes.map(({ path, Component }: IRoute) => (
        <Route key={path} path={path} element={<Component />} />
    ));
    routes.push(<Route path='*' key={1} element={<Navigate to='/' replace />} />);
    if (token) {
        routes = authUserRoutes.map(({ path, Component }: IRoute) => (
            <Route key={path} path={path} element={<Component />} />
        ));
        routes.push(
            <Route path='*' key={2} element={<Navigate to='/points' replace />} />
        );
    }

    return <Routes>{routes}</Routes>;
};

export { AppRoutes };
