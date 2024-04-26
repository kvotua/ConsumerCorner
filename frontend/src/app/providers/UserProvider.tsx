import { Notification } from "src/shared/Notification/Notification";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useQuery } from "react-query";
import { Cookies } from "react-cookie";
import { api } from "../http";
import { IUser } from "../types/user.type";
import { IError } from "../types/error.type";
import { setUser } from "../store/slices/userSlice";

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  useQuery({
    queryKey: "getUser",
    queryFn: () => {
      if (new Cookies().get("token")) {
        return api
          .get<IUser>(
            `/proprietors/by/token?token=${new Cookies().get("token")}`
          )
          .then(({ data }) => data)
          .catch((err) => {
            throw err;
          });
      }
      return null;
    },
    onSuccess: (data) => {
      console.log(data);
      
      dispatch(setUser(data));
    },
    onError: (err: IError) => {
      if (err.response?.data.detail === "Wrong token") {
        new Cookies().remove("token");
      }
    },
  });
  return (
    <>
      <Notification />
      {children}
    </>
  );
};

export { UserProvider };
