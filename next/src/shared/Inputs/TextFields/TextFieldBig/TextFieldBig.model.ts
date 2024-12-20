import { HTMLProps } from "react";

export interface ITextFieldBig extends HTMLProps<HTMLTextAreaElement> {
  isError?: boolean;
}
