import {
  CONFIRM_PAGE,
  POINTS_PAGE,
  ENTREPRENEUR_PROFILE,
  HOME_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  // USER_PROFILE,
  ADDPOINTS_PAGE,
  CONFIRM_LOGIN_PAGE,
} from "../constants/Constants";
import LogIn from "../pages/Auth/LogIn";
import Register from "../pages/Auth/Register";
import { Points } from "../pages/Points/Points";
import { Home } from "../pages/Home/Home";
import { EntrepreneurProfile } from "../pages/Profiles/EntrepreneurProfile/EntrepreneurProfile";
// import { UserProfile } from "../pages/Profiles/UserProfile/UserProfile";
import { Сonfirm } from "../pages/Сonfirm/Сonfirm";
import AddPoints from "../pages/Points/AddPoints";
import ConfirmLogin from "../pages/Сonfirm/ConfirmLogin";
import QRPage from "../pages/QRPage/QRPage";
import Point from "../pages/Point/Point";
import Comments from "../pages/Comments/Comments";
import EditPoint from "../pages/EditPoint/EditPoint";
import Report from "../pages/Report/Report";
import Proposal from "../pages/Proposal/Proposal";
import Thanks from "../pages/Thanks/Thanks";
import Reviews from "../pages/Reviews/Reviews";
import EntrepreneurProfileEdit from "../pages/Profiles/EntrepreneurProfile/EntrepreneurProfileEdit";

export const authUserRoutes = [
  // {
  //   path: USER_PROFILE + "/:id",
  //   Component: UserProfile,
  // },
  {
    path: ENTREPRENEUR_PROFILE + "/:id",
    Component: EntrepreneurProfile,
  },
  {
    path: POINTS_PAGE,
    Component: Points,
  },
  {
    path: ADDPOINTS_PAGE,
    Component: AddPoints,
  },
  {
    path: POINTS_PAGE + "/:id/edit",
    Component: EditPoint,
  },
  {
    path: POINTS_PAGE + "/:id",
    Component: Point,
  },
  {
    path: POINTS_PAGE + "/:id/comments",
    Component: Comments,
  },
  {
    path: POINTS_PAGE + "/:id/report",
    Component: Report,
  },
  {
    path: POINTS_PAGE + "/:id/Proposal",
    Component: Proposal,
  },
  {
    path: "/thanks",
    Component: Thanks,
  },
  {
    path: POINTS_PAGE + "/:id/reviews",
    Component: Reviews,
  },
  {
    path: "/EntrepreneurProfile",
    Component: EntrepreneurProfile,
  },
  {
    path: "/EntrepreneurProfile/edit",
    Component: EntrepreneurProfileEdit,
  },
];

export const publicRoutes = [
  {
    path: HOME_PAGE,
    Component: Home,
  },
  {
    path: REGISTER_PAGE,
    Component: Register,
  },
  {
    path: LOGIN_PAGE,
    Component: LogIn,
  },
  {
    path: CONFIRM_PAGE,
    Component: Сonfirm,
  },
  {
    path: CONFIRM_LOGIN_PAGE,
    Component: ConfirmLogin,
  },
  {
    path: "/qr",
    Component: QRPage,
  },
  {
    path: POINTS_PAGE + "/:id",
    Component: Point,
  },
  {
    path: POINTS_PAGE + "/:id/comments",
    Component: Comments,
  },
  //   {
  //     path: POINTS_PAGE + "/:id/reviews",
  //     Component: Point,
  //   },
  //   {
  //     path: POINTS_PAGE + "/:id/docs",
  //     Component: Point,
  //   },
  //   {
  //     path: POINTS_PAGE + "/:id/socials",
  //     Component: Point,
  //   },
  {
    path: POINTS_PAGE + "/:id/report",
    Component: Report,
  },
  {
    path: POINTS_PAGE + "/:id/Proposal",
    Component: Proposal,
  },
  {
    path: "/thanks",
    Component: Thanks,
  },
];
