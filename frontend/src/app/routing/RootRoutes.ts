import { lazy } from "react";

export const publicRoutes = [
  {
    path: "/",
    Element: lazy(() => import("src/pages/Home/Home")),
  },
  {
    path: "/login",
    Element: lazy(() => import("src/pages/Auth/Login/Login")),
  },
  {
    path: "/register",
    Element: lazy(() => import("src/pages/Auth/Register/Register")),
  },
  {
    path: "/point/:pointId",
    Element: lazy(() => import("src/pages/Point/Point")),
  },
  {
    path: "/point/:pointId/rights",
    Element: lazy(() => import("src/pages/Rights/Rights")),
  },
  {
    path: "/point/:pointId/book",
    Element: lazy(() => import("src/pages/Book/Book")),
  },
  {
    path: "/point/:pointId/docs",
    Element: lazy(() => import("src/pages/Docs/Docs")),
  },
  {
    path: "/point/:pointId/socials",
    Element: lazy(() => import("src/pages/Socials/Socials")),
  },
  {
    path: "/point/:pointId/info",
    Element: lazy(() => import("src/pages/Info/Info")),
  },
  {
    path: "/point/:pointId/book/report",
    Element: lazy(() => import("src/pages/Report/Report")),
  },
  {
    path: "/point/:pointId/book/Offer",
    Element: lazy(() => import("src/pages/Offer/Offer")),
  },
  {
    path: "/thanks",
    Element: lazy(() => import("src/pages/Thanks/Thanks")),
  },
];

export const authRoutes = [
  {
    path: "/points",
    Element: lazy(() => import("src/pages/Points/Points")),
  },
  {
    path: "/points/add/*",
    Element: lazy(() => import("src/pages/PointAdd/PointAdd")),
  },
  {
    path: "/profile",
    Element: lazy(() => import("src/pages/Profile/Profile")),
  },
  {
    path: "/profile/edit",
    Element: lazy(() => import("src/pages/ProfileEdit/ProfileEdit")),
  },
  {
    path: "/point/:pointId/reviews",
    Element: lazy(() => import("src/pages/Reviews/Reviews")),
  },
  {
    path: "/point/:pointId/edit",
    Element: lazy(() => import("src/pages/PointEdit/PointEdit")),
  },
  {
    path: "/point/:pointId/qr",
    Element: lazy(() => import("src/pages/QR/QR")),
  },
];
