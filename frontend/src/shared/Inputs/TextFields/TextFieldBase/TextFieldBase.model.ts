import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface ITextFieldBase extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: "text" | "password" | "email" | "number";
  subLabel?: string;
  isError?: boolean;
  errorMessage?: FieldError;
  className?: string;
  isPhone?: boolean;
}
