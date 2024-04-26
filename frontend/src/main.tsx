import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./app/store/index.ts";
import { UserProvider } from "./app/providers/UserProvider.tsx";
import { PointDataProvider } from "./app/providers/PointDataProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>

  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <PointDataProvider>
            <App />
          </PointDataProvider>
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>

  // </React.StrictMode>
);
