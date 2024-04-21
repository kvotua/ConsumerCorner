import { HTMLAttributes } from "react";

export interface IButtonBack extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  link?: string;
  isActive?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
}
