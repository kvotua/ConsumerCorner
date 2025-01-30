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
    mutationFn: async ({ pointID, text, name, number, isAnonimus, stars, isReport }: Omit<IComments, "id">) => {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('isAnonimus', String(isAnonimus));
      formData.append('isReport', String(isReport));
      if (!isAnonimus) {
        formData.append('name', name as string);
        formData.append('number', number as string);
      }
      if (isReport) {
        formData.append('stars', String(stars));
      }
      const response = await api.post(`/comments/${pointID}`, formData);
      return response.data;
    },
    onError: () => {
      toast.error("Ой! произошла ошибка");
    },
    onSuccess: () => push("/thanks"),
  });
};

// export const useAddComments = () => {
//   const { push } = useRouter();
//   return useMutation({
//     mutationKey: "addComment",
//     mutationFn: ({ pointID, message, name, number, isAnonimus }: Omit<IComments, "id">) =>
//       api.post(`/comments/${pointID}`, { message, name, number, isAnonimus }),
//     onError: () => {
//       toast.error("Ой! произошла ошибка");
//     },
//     onSuccess: () => push("/thanks"),
//   });
// };
