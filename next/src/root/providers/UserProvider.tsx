import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useGetUser } from "../services/user";

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  useGetUser({
    onSuccess: (data) => dispatch(setUser(data!)),
  });
  return children;
};

export { UserProvider };
