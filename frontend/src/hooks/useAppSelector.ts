import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../store/store";
//хук для обычного селектора но с типизацией
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
