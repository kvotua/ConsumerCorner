import { AxiosError } from "axios";

export type IError = AxiosError<{ detail: string }>;
