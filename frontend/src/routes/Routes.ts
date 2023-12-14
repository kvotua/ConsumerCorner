import { FC } from "react"
import { AddPoint } from "src/pages/AddPoint/AddPoint"
import { Login } from "src/pages/Auth/LogIn"
import { Register } from "src/pages/Auth/Register"
import { Book } from "src/pages/Book/Book"
import { Docs } from "src/pages/Docs/Docs"
import { AddDocs } from "src/pages/AddDocs/AddDocs"
import { Home } from "src/pages/Home/Home"
import { Menu } from "src/pages/Menu/Menu"
import { Offer } from "src/pages/Offer/Offer"
import { Other } from "src/pages/Other/Other"
import { Payments } from "src/pages/Payments/Payments"
import { Point } from "src/pages/Point/Point"
import { Points } from "src/pages/Points/Points"
import { Profile } from "src/pages/Profile/Profile"
import { ProfileEdit } from "src/pages/ProfileEdit/ProfileEdit"
import { QR } from "src/pages/QR/QR"
import { Report } from "src/pages/Report/Report"
import { Reviews } from "src/pages/Reviews/Reviews"
import { Rights } from "src/pages/Rights/Rights"
import { Socials } from "src/pages/Socials/Socials"
import { Thanks } from "src/pages/Thanks/Thanks"
import EditPoint from "src/pages/EditPoint/EditPoint"

interface IRoute {
  path: string
  Component: FC
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
    path: "/point/:pointId/menu/rights",
    Component: Rights,
  },
  {
    path: "/point/:pointId/menu/socials",
    Component: Socials,
  },
  {
    path: "/thanks",
    Component: Thanks,
  },
]

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
    path: "/point/:pointId/AddDocs",
    Component: AddDocs,
  },
  {
    path: "/point/:pointId/reviews",
    Component: Reviews,
  },
  {
    path: "/point/:pointId/editPoint",
    Component: EditPoint,
  },
  {
    path: "/point/:pointId/qr",
    Component: QR,
  },
  {
    path: "/point/:pointId/menu/rights",
    Component: Rights,
  },
  {
    path: "/point/:pointId/menu/socials",
    Component: Socials,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/profile/edit",
    Component: ProfileEdit,
  },
  {
    path: "/profile/payments",
    Component: Payments,
  },
]
