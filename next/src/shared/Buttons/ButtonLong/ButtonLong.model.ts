import { HTMLAttributes } from "react";

export interface IButtonLong extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive?: boolean;
  handleClick?: () => void;
  link?: string;
}
