import { useMutation, useQueryClient } from "react-query";
import { api } from "../http";

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

export const useBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "payments",
    mutationFn: ({ token, price }: IPayments) =>
      api.post(`/payments/${token}?value=${price}`).then(({ data }) => data),
    onSuccess: () => queryClient.invalidateQueries("getUser"),
  });
};
