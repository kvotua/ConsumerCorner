import { InputHTMLAttributes } from "react";
import { Control, FieldError, RegisterOptions } from "react-hook-form";

export interface IFileInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  control: Control<any, any>;

  fileName?: string;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;

  isError?: boolean;
  className?: string;
  subLabel?: string;
  register?: any;
  file?: File;
  errorMessage?: FieldError;
  progressUbload?: number;
  successUpload?: boolean;
  errorUpload?: boolean;
}
