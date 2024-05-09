"use client";
import { useGetPointData } from "@/root/providers/PointDataProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TextFieldBase } from "@/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";
interface IInfo {
  title: string;
  inn: string;
  ogrn: string;
}
const infoSchema = yup.object().shape({
  title: yup.string().required("Название обязательно"),
  inn: yup.string().required("ИНН обязателен"),
  ogrn: yup.string().required("ОГРН обязателен"),
});
export default function InfoPoint() {
  const { values, setValues } = useGetPointData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInfo>({
    resolver: yupResolver(infoSchema),
    defaultValues: {
      inn: values?.inn || "7727563778",
      ogrn: values?.ogrn || "1057749631994",
      title: values?.title || "",
    },
  });
  const { push } = useRouter();

  const onSubmit = (data: IInfo) => {
    setValues(data);
    push("/points/add/2");
  };
  return (
    <form
      id="point"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <span className="text-center">Основная информация</span>
      <TextFieldBase
        {...register("inn")}
        placeholder="7820000349"
        label="ИНН точки"
        isError={!!errors.inn}
        errorMessage={errors.inn}
      />
      <TextFieldBase
        {...register("ogrn")}
        placeholder="1039000049380"
        label="ОГРН точки"
        isError={!!errors.ogrn}
        errorMessage={errors.ogrn}
      />
      <TextFieldBase
        {...register("title")}
        placeholder='ООО "Название"'
        label="Телефон точки"
        isError={!!errors.title}
        errorMessage={errors.title}
      />
    </form>
  );
}
