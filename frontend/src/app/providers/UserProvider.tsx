import { Notification } from "src/shared/Notification/Notification";
import { useGetUser } from "../services/user.service";


const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useGetUser();
  return (
    <>
      <Notification />
      {children}
    </>
  );
};

export { UserProvider };
