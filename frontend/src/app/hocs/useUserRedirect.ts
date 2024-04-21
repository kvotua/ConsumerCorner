import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const useUserRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (new Cookies().get("token")) {
      return navigate("/points");
    }
  }, [new Cookies().get("token")]);
};
