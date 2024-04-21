import { HTMLAttributes } from "react";

export interface IButtonBig extends HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  link: string;
}
