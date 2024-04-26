import { ToastContainer } from "react-toastify";

const Notification: React.FC = () => {
  return (
    <ToastContainer
      position="top-center"
      hideProgressBar
      className={"p-2"}
      toastStyle={{ borderRadius: "20px" }}
      draggableDirection="y"
      closeButton={false}
      autoClose={2000}
    />
  );
};

export { Notification };
