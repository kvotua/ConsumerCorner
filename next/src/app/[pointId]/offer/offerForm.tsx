"use client";
import { useAddComments } from "@/root/services/comments";
import { TextFieldBig } from "@/shared/Inputs/TextFields/TextFieldBig/TextFieldBig";
import { TextFieldBase } from "@/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  message: string;
  fullName?: string;
  phoneNumber?: string;
}

const OfferForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { mutate } = useAddComments();
  const { pointId } = useParams();
  const [isAnonymous, setIsAnonymous] = useState(false); // false = отключён, true = включён

  const onSubmit = (data: FormData) => {
    const payload = {
      text: data.message,
      pointID: pointId as string,
      isAnonimus: isAnonymous as boolean,
      name: isAnonymous ? "" : data.fullName as string,
      number: isAnonymous ? "" : data.phoneNumber as string,
      stars: 0,
      isReport: false
    };
    mutate(payload);
  };

  return (
    <form
      id="offer"
      className="py-5 flex-grow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextFieldBig
        {...register("message", { required: true })}
        isError={!!errors.message}
        label="Пожалуйста, напишите в форму ниже ваше предложение."
        placeholder="Напишите ваше предложение"
      />
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
            className={`w-12 h-6 rounded-full shadow-lg transition-all ${isAnonymous ? "bg-blue-500" : "bg-blue-700"
              }`}
          >
            <span
              className={`absolute w-5 h-5 bg-white rounded-full shadow-md top-0.5 transition-transform ${isAnonymous ? "translate-x-6" : "translate-x-0.5"
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

export { OfferForm };
