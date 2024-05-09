"use client";
import { Notification } from "@/shared/Notification/Notification";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../store";
import { UserProvider } from "./UserProvider";
import { PointDataProvider } from "./PointDataProvider";

const RootProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <PointDataProvider>
            <Notification>{children}</Notification>
          </PointDataProvider>
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export { RootProvider };
