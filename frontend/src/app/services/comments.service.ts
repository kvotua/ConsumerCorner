import { useMutation, useQuery } from "react-query";
import { api } from "../http";
import { Cookies } from "react-cookie";
import { IComments } from "../types/comments.type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useGetComments = (id: string) => {
  return useQuery({
    queryKey: "getComments",
    queryFn: () =>
      api
        .get<
          IComments[]
        >(`/comments/by/pointID?token=${new Cookies().get("token")}&pointID=${id}`)
        .then(({ data }) => data),
  });
};

export const useAddComments = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: "addCommnet",
    mutationFn: ({ pointID, message }: Omit<IComments, "id">) =>
      api.post(`/comments`, { pointID, message }),
    onError: () => {
      toast.error("Ой! произошла ошибка");
    },
    onSuccess: () => navigate("/thanks"),
  });
};
