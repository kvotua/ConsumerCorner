import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { IPointAdd } from "../PointAdd/PointsAdd.type";
import { FileInput } from "src/shared/Inputs/FileInput/FileInput";
import { TextFieldBase } from "src/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";
import { useEditPoint, useGetPointById } from "src/app/services/points.service";

const PointEditForm: React.FC = () => {
  const { pointId } = useParams();
  const { data: point } = useGetPointById(pointId!);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Partial<IPointAdd>>({
    values: {
      inn: point?.inn,
      ogrn: point?.ogrn,
      address: point?.address,
      phone_number: point?.phone_number?.replace("tel:", "") ?? "",
      title: point?.title,
    },
    reValidateMode: "onChange",
  });
  // const { data } = useGetDocsPointByPointId(pointId!);

  const { mutate } = useEditPoint();
  const onSubmit = async (data: Partial<IPointAdd>) => {
    mutate({ body: data as IPointAdd, pointId: pointId! });
  };
  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex-grow flex flex-col justify-center gap-5 py-5 relative"
      id="editPoint"
    >
      <Swiper
        spaceBetween={20}
        loop={true}
        className="w-full overflow-y-visible"
      >
        <SwiperSlide className="flex flex-col gap-2">
          <h3 className="pb-5 font-bold">Основаня информаиця</h3>
          <TextFieldBase
            {...register("title")}
            placeholder="Название"
            label="Название предприятия"
            isError={!!errors.title}
          />
          <div className="flex gap-5 w-full">
            <TextFieldBase
              {...register("inn")}
              placeholder="7727563778"
              label="ИНН"
              isError={!!errors.inn}
            />
            <TextFieldBase
              {...register("ogrn")}
              placeholder="1057749631994"
              label="ОГРН"
              isError={!!errors.ogrn}
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className=" w-full flex flex-col gap-2">
          <h3 className="pb-5 font-bold">Документы</h3>
          <FileInput control={control} label="Лицензии" name="license" />
          <FileInput
            control={control}
            label="Акредитации"
            name="accreditation"
          />
          <FileInput
            control={control}
            label="Журнал учета проверок"
            name="journal"
          />
        </SwiperSlide>

        <SwiperSlide className="flex flex-col gap-2">
          <h3 className="pb-5 font-bold">Контактная информаиця</h3>
          <TextFieldBase
            {...register("address")}
            label="Адрес адрес предприятия"
            placeholder="г. Москва, ул. Центральная"
            isError={!!errors.address}
          />
          <TextFieldBase
            {...register("phone_number")}
            placeholder="+7 905 123 45 67"
            isPhone
            label="Телефон"
            isError={!!errors.phone_number}
          />
        </SwiperSlide>
      </Swiper>
    </form>
  );
};

export { PointEditForm };
