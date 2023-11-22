import { FC } from "react";
import { AddPoint } from "src/Pages/AddPoint/AddPoint";
import { Login } from "src/Pages/Auth/Login";
import { Register } from "src/Pages/Auth/Register";
import { Menu } from "src/Pages/Menu/Menu";
import { EditAddress } from "src/Pages/EditAddress/EditAddress";
import { Home } from "src/Pages/Home/Home";
import { Payments } from "src/Pages/Payments/Payments";
import { Point } from "src/Pages/Point/Point";
import { Points } from "src/Pages/Points/Points";
import { Profile } from "src/Pages/Profile/Profile";
import { Docs } from "src/Pages/Docs/Docs";
import { Book } from "src/Pages/Book/Book";
import { Offer } from "src/Pages/Offer/Offer";
import { Report } from "src/Pages/Report/Report";
import { Other } from "src/Pages/Other/Other";
import { Thanks } from "src/Pages/Thanks/Thanks";
import { Reviews } from "src/Pages/Reviews/Reviews";
import { QR } from "src/Pages/QR/QR";

interface IRoute {
    path: string;
    Component: FC;
}
export const publicRoute: IRoute[] = [
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/register",
        Component: Register,
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/point/:pointId",
        Component: Point,
    },
    {
        path: "/point/:pointId/menu",
        Component: Menu,
    },
    {
        path: "/point/:pointId/menu/docs",
        Component: Docs,
    },
    {
        path: "/point/:pointId/menu/book",
        Component: Book,
    },
    {
        path: "/point/:pointId/menu/book/offer",
        Component: Offer,
    },
    {
        path: "/point/:pointId/menu/book/report",
        Component: Report,
    },
    {
        path: "/point/:pointId/menu/book/other",
        Component: Other,
    },
    {
        path: "/thanks",
        Component: Thanks,
    },
];

export const authRoute: IRoute[] = [
    {
        path: "/points",
        Component: Points,
    },
    {
        path: "/point/:pointId",
        Component: Point,
    },
    {
        path: "/points/add",
        Component: AddPoint,
    },
    {
        path: "/point/:pointId/editAddress",
        Component: EditAddress,
    },
    {
        path: "/point/:pointId/reviews",
        Component: Reviews,
    },
    {
        path: "/point/:pointId/qr",
        Component: QR,
    },
    {
        path: "/profile",
        Component: Profile,
    },
    {
        path: "/profile/payments",
        Component: Payments,
    },
];
