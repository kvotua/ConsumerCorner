"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetPointData } from "@/root/providers/PointDataProvider";
import { useRouter } from "next/navigation";
import { TextFieldBase } from "@/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";

interface IContact {
  address: string;
  phone_number: string;
}
const contactSchema = yup.object().shape({
  address: yup.string().required("Адрес обязателен"),
  phone_number: yup.string().required("Телефон обязателен"),
});

export default function ContactPoint() {
  const { values, setValues } = useGetPointData();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>({
    resolver: yupResolver(contactSchema),
    values: {
      address: values?.address || "",
      phone_number: values?.phone_number || "",
    },
  });
  useEffect(() => {
    if (!values?.inn || !values?.ogrn || !values?.title) {
      push("/points");
    }
  }, []);
  const onSubmit = (data: IContact) => {
    setValues(data);
    push("/points/add/3");
  };
  return (
    <form
      id="point"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <span className="text-center">Контактная информация</span>
      <TextFieldBase
        {...register("address")}
        placeholder="г. Калининград ул. центральная"
        label="Адрес точки"
        isError={!!errors.address}
        errorMessage={errors.address}
      />
      <TextFieldBase
        isPhone
        {...register("phone_number")}
        placeholder="+7 123 456 78 90"
        label="Телефон точки"
        isError={!!errors.phone_number}
        errorMessage={errors.phone_number}
      />
    </form>
  );
}
