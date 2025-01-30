import { useMutation, useQuery, useQueryClient } from "react-query";
import { api, apiFile } from "../http";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import { IPoint, IFirma } from "../types/point";
import { IError } from "../types/error";
import { ProgressContext } from "../providers/ProgressProvider";
import { useContext, useState } from "react";
import { useGetPointData } from "../providers/PointDataProvider";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../hooks/useAppSelector";

/** Получение точки по id */
export const useGetFirmaByPointId = (id: string) => {
  return useQuery({
    queryKey: ["getPoint", id],
    queryFn: () =>
      api.get<IFirma>(`/points/firm-info/${id}`).then(({ data }) => data),
  });
};
export const useGetPointById = (id: string) => {
  return useQuery({
    queryKey: ["getPoint", id],
    queryFn: () =>
      api.get<IPoint>(`/points/${id}`).then(({ data }) => data),
  });
};

export function formatName(fullName: string | undefined) {
  if (!fullName) {
    return;
  }

  const parts = fullName.split(' ');

  if (parts.length < 3) {
    throw new Error("Полное имя должно содержать фамилию, имя и отчество.");
  }

  const lastName = parts[0];
  const firstNameInitial = parts[1].charAt(0) + '.';
  const patronymicInitial = parts[2].charAt(0) + '.';

  return `ИП ${lastName} ${firstNameInitial}${patronymicInitial}`;
};

/** Добавление точки */
export const useUploadFile = ({
  onSuccess,
}: { onSuccess?: (data: any) => void } = {}) => {
  const [progress, setProgress] = useState(0);
  const [ids, setIds] = useState<string[]>([]);

  return {
    mutation: useMutation({
      mutationKey: "addDocs",
      mutationFn: async (file: FileList) => {
        for (let i = 0; i < file.length; i++) {
          const formData = new FormData();
          formData.append("file", file[i]);
          await api
            .post("/files", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (progress) => {
                setProgress(
                  Math.round((progress.loaded * 100) / progress.total!)
                );
              },
            })
            .then(({ data }) => {
              setIds((prev) => [...prev, data]);
              return data;
            });
        }
      },
      onSuccess: onSuccess,
    }),
    ids,
    progress,
  };
};
export const useAddPoint = () => {
  const queryClient = useQueryClient();
  const { clearValues } = useGetPointData();
  const { setIsLoading } = useContext(ProgressContext);
  const { push } = useRouter();
  const user = useAppSelector((state) => state.userReduser.user);
  return useMutation({
    mutationKey: "addPoint",
    mutationFn: async ({
      accreditation_file_ids,
      audit_log_file_id,
      license_file_ids,
      address,
      inn,
      ogrn,
      phone_number,
      title,
    }: Omit<IPoint, "id">) => {
      setIsLoading(true);
      return api.post(`points?token=${new Cookies().get("token")}`, {
        accreditation_file_ids,
        audit_log_file_id,
        license_file_ids,
        address,
        inn,
        ogrn,
        phone_number,
        title,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUser"],
        refetchActive: true,
      });
      setIsLoading(false);
      toast.success("Точка создана");
      clearValues();
      push("/points");
    },
    onError: (err: IError) => {
      setIsLoading(false);

      switch (err.response?.data.detail) {
        case "Insufficient funds":
          toast.error("У вас не достаточно средств", {
            onClick: () => push(`/profile/${user?.id}`),
            autoClose: 2000,
          });
          break;
        case "invalid inn":
          toast.error("Не правильный ИНН", {
            autoClose: 2000,
          });
          break;
        case "invalid ogrn":
          toast.error("Не правильный ОГРН", {
            autoClose: 2000,
          });
          break;
      }
    },
  });
};

/** Обновление точки */

export const useEditPoint = () => {
  const queryClient = useQueryClient();
  const { setIsLoading } = useContext(ProgressContext);
  const { push } = useRouter();
  return useMutation({
    mutationKey: "addPoint",
    mutationFn: async ({ body, pointId }: { body: any; pointId: string }) => {
      setIsLoading(true);
      return api.patch(
        `points?token=${new Cookies().get("token")}&pointID=${pointId}`,
        {
          title: body.title,
          address: body.address,
          phone_number: body.phone_number,
          inn: body.inn,
          ogrn: body.ogrn,
          // audit_log_file_id: journal && journal,
          // license_file_ids: accreditation && [accreditation],
          // accreditation_file_ids: license && [license],
        }
      );
    },
    onSuccess: () => {
      toast.success("Точка обновлена");
      setIsLoading(false);
      queryClient.invalidateQueries("getUser", { exact: true });
      push("/points");
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Ой! произошла ошибка", {
        onClick: () => push("/profile"),
        autoClose: 2000,
      });
    },
  });
};

export const useDeletePoint = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation({
    mutationKey: "deletePoint",
    mutationFn: (pointId: string) =>
      api
        .delete(`points?token=${new Cookies().get("token")}&pointID=${pointId}`)
        .then(({ data }) => data),
    onSuccess: () => {
      toast.success("Точка удалена");
      queryClient.invalidateQueries("getUser", { exact: true });
      push("/points");
    },
  });
};

export const useGetDocsPointByPointId = (pointId: string) => {
  const { data: point } = useGetPointById(pointId);

  return useQuery({
    queryKey: ["getDocsPointByUserId"],
    queryFn: async () => ({
      accreditation_file_ids: point?.accreditation_file_ids.map(
        async (id) =>
          await apiFile
            .get<File | FileList>(`/files/${id}`)
            .then(({ data }) => data)
      ),
      license_file_ids: point?.license_file_ids.map(
        async (id) =>
          await apiFile
            .get<File | FileList>(`/files/${id}`)
            .then(({ data }) => data)
      ),
      audit_log_file_id: apiFile
        .get<File | FileList>(`/files/${point?.audit_log_file_id}`)
        .then(({ data }) => data),
    }),
    enabled: !!point,
  });
};
