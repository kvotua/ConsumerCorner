"use client";
import { useAddComments } from "@/root/services/comments";
import { TextFieldBig } from "@/shared/Inputs/TextFields/TextFieldBig/TextFieldBig";
import { TextFieldBase } from "@/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Rating } from "@mui/material";

interface FormData {
  message: string;
  fullName?: string;
  phoneNumber?: string;
  stars: number;
}

const ReportForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const { mutate } = useAddComments();
  const { pointId } = useParams();
  const [isAnonymous, setIsAnonymous] = useState(true); // false = отключён, true = включён

  const onSubmit = (data: FormData) => {
    const payload = {
      text: data.message,
      pointID: pointId as string,
      isAnonimus: isAnonymous as boolean,
      name: isAnonymous ? "" : data.fullName as string,
      number: isAnonymous ? "" : data.phoneNumber as string,
      stars: data.stars,
      isReport: true,
    };
    mutate(payload);
  };

  return (
    <form
      id="report"
      className="py-5 flex-grow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextFieldBig
        {...register("message", { required: true })}
        isError={!!errors.message}
        label="Пожалуйста, напишите в форму ниже ваш отзыв"
        placeholder="Напишите ваш отзыв"
      />
      
      {/* Поле для выбора звезд */}
      <div className="mt-10">
        <Controller
          name="stars"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Rating
              {...field}
              size="large"
              value={field.value || 0}
              onChange={(event, newValue) => {
                field.onChange(newValue);
              }}
              precision={1}
            />
          )}
        />
        {errors.stars && <p className="text-red-500">Пожалуйста, выберите оценку</p>}
      </div>

      {/* Поля имени и номера отображаются только если isAnonymous === false */}
      {!isAnonymous && (
        <>
          <div className="mt-10">
            <TextFieldBase
              {...register("fullName", { required: !isAnonymous })}
              isError={!!errors.fullName}
              label="Фамилия и Имя"
              placeholder="Иванов Иван"
            />
          </div>
          <div className="mt-10">
            <TextFieldBase
              {...register("phoneNumber", { required: !isAnonymous })}
              isError={!!errors.phoneNumber}
              label="Контактный номер телефона"
              placeholder="+7-915-999-22-00"
            />
          </div>
        </>
      )}

      <div className="flex items-center justify-between text-white p-4 pl-0 pr-0 rounded-lg">
        <p className="text-lg font-bold text-left">Анонимный отзыв</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
          <div
            className={`w-12 h-6 rounded-full shadow-lg transition-all ${
              isAnonymous ? "bg-blue-500" : "bg-blue-700"
            }`}
          >
            <span
              className={`absolute w-5 h-5 bg-white rounded-full shadow-md top-0.5 transition-transform ${
                isAnonymous ? "translate-x-6" : "translate-x-0.5"
              }`}
            ></span>
          </div>
        </label>
      </div>
      <p className="text-sm opacity-70">
        Деанонимизировав свой отзыв, вы сможете получить обратную связь от
        управляющей команды.
      </p>
    </form>
  );
};

export { ReportForm };