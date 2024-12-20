import { createContext } from "react";

interface IProgressProvider {
  progress: number;
  isLoading: boolean;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProgressContext = createContext<IProgressProvider>({
  progress: 0,
  isLoading: false,
  setIsLoading: () => {},
  setProgress: () => {},
});
