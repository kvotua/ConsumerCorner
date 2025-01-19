import { useMutation, useQuery } from "react-query";
import { api } from "../http";
import { Cookies } from "react-cookie";
import { IDocument } from "../types/mongo";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const useGetDocument = (id: string) => {
    return useQuery({
        queryKey: ["getDocument", id],
        queryFn: () =>
            api
                .get<IDocument>(
                    `/mongo/document/${id}`
                )
                .then(({ data }) => data),
        enabled: !!id, // Запрос будет выполнен только если id установлен
    });
};