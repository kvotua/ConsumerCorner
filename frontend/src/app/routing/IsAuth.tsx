import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const IsAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!new Cookies().get("token")) {
    return <Navigate to={"/"} />;
  }
  return children;
};
export { IsAuth };
