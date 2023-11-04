import { Provider } from "react-redux";
import { AppRoutes } from "./routes/AppRoutes";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
    return (
        <>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <AppRoutes />
                    </Provider>
                </QueryClientProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
