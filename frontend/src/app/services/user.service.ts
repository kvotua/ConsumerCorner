import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../http";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Cookies } from "react-cookie";
import { IUser } from "../types/user.type";
import { setUser } from "../store/slices/userSlice";
import { IError } from "../types/error.type";

interface IPayments {
  token: string;
  price: number;
}

export const useGetUser = () => {
  const dispatch = useAppDispatch();
  return useQuery({
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
    onSuccess: (data) => dispatch(setUser(data)),
    onError: (err: IError) => {
      if (err.response?.data.detail === "Wrong token") {
        new Cookies().remove("token");
      }
    },
  });
};

// export const useUpdateUser = () => {
//   return useMutation({
//     mutationKey: 'updateUser',
//     mutationFn: () => api.patch()
//   })
// };

export const useBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "payments",
    mutationFn: ({ token, price }: IPayments) =>
      api.post(`/payments/${token}?value=${price}`).then(({ data }) => data),
    onSuccess: () => queryClient.invalidateQueries("getUser"),
  });
};
