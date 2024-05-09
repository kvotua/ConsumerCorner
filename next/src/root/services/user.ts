import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../http";
import { Cookies, useCookies } from "react-cookie";
import { IUser } from "../types/user";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { IError } from "../types/error";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Id, ToastContent, toast } from "react-toastify";

interface IPayments {
  token: string;
  price: number;
}

// export const useUpdateUser = () => {
//   return useMutation({
//     mutationKey: 'updateUser',
//     mutationFn: () => api.patch()
//   })
// };

export const useGetUser = ({
  onSuccess,
}: {
  onSuccess?: (data?: IUser) => void;
} = {}) => {
  const dispatch = useAppDispatch();
  const [{ token }] = useCookies();
  return useQuery({
    queryKey: "getUser",
    queryFn: () => {
      if (token) {
        return api
          .get<IUser>(`/proprietors/by/token?token=${token}`)
          .then(({ data }) => data)
          .catch((err) => {
            throw err;
          });
      }
      return null;
    },
    onSuccess: onSuccess,
    onError: (err: IError) => {
      if (err.response?.data.detail === "Wrong token") {
        new Cookies().remove("token");
        dispatch(setUser(null));
      }
    },
    enabled: !!token,
  });
};

export const useBalance = () => {
  const queryClient = useQueryClient();
  let loading: Id;

  return useMutation({
    mutationKey: "payments",
    mutationFn: ({ token, price }: IPayments) => {
      loading = toast.loading("Пожалуйста подождите");

      return api
        .post(`/payments/${token}?value=${price}`)
        .then(({ data }) => data);
    },
    onSuccess: () => {
      toast.update(loading, {
        type: "success",
        render: "Баланс пополнен",
        isLoading: false,
      });
      queryClient.invalidateQueries("getUser");
    },
    onError: () => {
      toast.update(loading, {
        type: "error",
        render: "Ой! Ошибка при пополнении баланса",
        isLoading: false,
      });
    },
  });
};
