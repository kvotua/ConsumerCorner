import { Provider } from "react-redux";
import { AppRoutes } from "./routes/AppRoutes";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
