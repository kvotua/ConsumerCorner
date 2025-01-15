import { useMutation, useQuery } from "react-query";
import { api } from "../http";
import { Cookies } from "react-cookie";
import { IComments } from "../types/comments";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const useGetComments = (id: string) => {
  return useQuery({
    queryKey: ["getComments", id],
    queryFn: () =>
      api
        .get<IComments[]>(
          `/comments/by/pointID?token=${new Cookies().get(
            "token"
          )}&pointID=${id}`
        )
        .then(({ data }) => data),
  });
};

export const useAddComments = () => {
  const { push } = useRouter();
  return useMutation({
    mutationKey: "addComment",
    mutationFn: ({ pointID, message }: Omit<IComments, "id">) =>
      api.post(`/comments/${pointID}`, { message }),
    onError: () => {
      toast.error("Ой! произошла ошибка");
    },
    onSuccess: () => push("/thanks"),
  });
};
