import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <ToastContainer
        position="top-center"
        draggable
        limit={3}
        stacked
        autoClose={3000}
      />

      {children}
    </>
  );
};

export { Notification };
