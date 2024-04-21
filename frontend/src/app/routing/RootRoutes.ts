import { Login } from "src/pages/Auth/Login/Login";
import { Register } from "src/pages/Auth/Register/Register";
import { Book } from "src/pages/Book/Book";
import { Docs } from "src/pages/Docs/Docs";
import { Home } from "src/pages/Home/Home";
import { Info } from "src/pages/Info/Info";
import { Offer } from "src/pages/Offer/Offer";
import { Point } from "src/pages/Point/Point";
import { PointAdd } from "src/pages/PointAdd/PointAdd";
import { PointEdit } from "src/pages/PointEdit/PointEdit";
import { Points } from "src/pages/Points/Points";
import { Profile } from "src/pages/Profile/Profile";
import { ProfileEdit } from "src/pages/ProfileEdit/ProfileEdit";
import { QR } from "src/pages/QR/QR";
import { Report } from "src/pages/Report/Report";
import { Reviews } from "src/pages/Reviews/Reviews";
import { Rights } from "src/pages/Rights/Rights";
import { Socials } from "src/pages/Socials/Socials";
import { Thanks } from "src/pages/Thanks/Thanks";

export const publicRoutes = [
  {
    path: "/",
    Element: Home,
  },
  {
    path: "/login",
    Element: Login,
  },
  {
    path: "/register",
    Element: Register,
  },
  {
    path: "/point/:pointId",
    Element: Point,
  },
  {
    path: "/point/:pointId/rights",
    Element: Rights,
  },
  {
    path: "/point/:pointId/book",
    Element: Book,
  },
  {
    path: "/point/:pointId/docs",
    Element: Docs,
  },
  {
    path: "/point/:pointId/socials",
    Element: Socials,
  },
  {
    path: "/point/:pointId/info",
    Element: Info,
  },
  {
    path: "/point/:pointId/book/report",
    Element: Report,
  },
  {
    path: "/point/:pointId/book/Offer",
    Element: Offer,
  },
  {
    path: "/thanks",
    Element: Thanks,
  },
];

export const authRoutes = [
  {
    path: "/points",
    Element: Points,
  },
  {
    path: "/points/add",
    Element: PointAdd,
  },
  {
    path: "/profile",
    Element: Profile,
  },
  {
    path: "/profile/edit",
    Element: ProfileEdit,
  },
  {
    path: "/point/:pointId/reviews",
    Element: Reviews,
  },
  {
    path: "/point/:pointId/edit",
    Element: PointEdit,
  },
  {
    path: "/point/:pointId/qr",
    Element: QR,
  },
];
