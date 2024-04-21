import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../http";
import { IPointAdd } from "src/pages/PointAdd/PointsAdd.type";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import { IPoint } from "../types/point.type";
import { IError } from "../types/error.type";
import { ProgressContext } from "../providers/ProgressProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

/** Получение точки по id */
export const useGetPointById = (id: string) => {
  return useQuery({
    queryKey: "getPoint",
    queryFn: () =>
      api.get<IPoint>(`/points?pointID=${id}`).then(({ data }) => data),
  });
};

/** Добавление точки */
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const useAddPoint = () => {
  const queryClient = useQueryClient();
  const { setIsLoading } = useContext(ProgressContext);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: "addPoint",
    mutationFn: async (body: IPointAdd) => {
      setIsLoading(true);
      const license = (await uploadFile(body.license_file_ids[0])).data;
      const accreditation = (await uploadFile(body.accreditation_file_ids[0]))
        .data;
      const journal = (await uploadFile(body.audit_log_file_id[0])).data;
      return api.post(`points?token=${new Cookies().get("token")}`, {
        title: body.title,
        address: body.address,
        phone_number: body.phone_number,
        inn: body.inn,
        ogrn: body.ogrn,
        audit_log_file_id: journal,
        license_file_ids: [accreditation],
        accreditation_file_ids: [license],
      });
    },
    onSuccess: () => {
      toast.success("Точка создана");
      setIsLoading(false);
      queryClient.invalidateQueries("getUser");
      navigate("/points");
    },
    onError: (err: IError) => {
      if (err.response?.data.detail === "Insufficient funds") {
        setIsLoading(false);
        toast.error("У вас не достаточно средств", {
          onClick: () => navigate("/profile"),
          autoClose: 2000,
        });
      }
    },
  });
};

/** Обновление точки */

export const useEditPoint = () => {
  const queryClient = useQueryClient();
  const { setIsLoading } = useContext(ProgressContext);
  const navigate = useNavigate();
  return useMutation({
    mutationKey: "addPoint",
    mutationFn: async ({
      body,
      pointId,
    }: {
      body: IPointAdd;
      pointId: string;
    }) => {
      setIsLoading(true);
      const license =
        body.license_file_ids[0] &&
        (await uploadFile(body.license_file_ids[0])).data;
      const accreditation =
        body.accreditation_file_ids[0] &&
        (await uploadFile(body.accreditation_file_ids[0])).data;
      const journal =
        body.audit_log_file_id[0] &&
        (await uploadFile(body.audit_log_file_id[0])).data;
      return api.patch(
        `points?token=${new Cookies().get("token")}&pointID=${pointId}`,
        {
          title: body.title,
          address: body.address,
          phone_number: body.phone_number,
          inn: body.inn,
          ogrn: body.ogrn,
          audit_log_file_id: journal && journal,
          license_file_ids: accreditation && [accreditation],
          accreditation_file_ids: license && [license],
        }
      );
    },
    onSuccess: () => {
      toast.success("Точка обновлена");
      setIsLoading(false);
      queryClient.invalidateQueries("getUser");
      navigate("/points");
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Ой! произошла ошибка", {
        onClick: () => navigate("/profile"),
        autoClose: 2000,
      });
    },
  });
};
