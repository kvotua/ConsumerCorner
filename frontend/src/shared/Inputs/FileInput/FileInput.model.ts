import { InputHTMLAttributes } from "react";

export interface IFileInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isError?: boolean;
  className?: string;
  subLabel?: string;
  register?: any;
  file?: File;
}
