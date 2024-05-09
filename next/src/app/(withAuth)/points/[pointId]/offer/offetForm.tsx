"use client";
import { useAddComments } from "@/root/services/comments";
import { TextFieldBig } from "@/shared/Inputs/TextFields/TextFieldBig/TextFieldBig";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

const OfferForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ message: string }>();
  const { mutate } = useAddComments();
  const { pointId } = useParams();
  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          message: data.message,
          pointID: pointId as string,
        })
      )}
      id="offer"
      className="py-5 flex-grow"
    >
      <TextFieldBig
        {...register("message", { required: true })}
        isError={!!errors.message}
        label="Пожалуйста, напишите в форму ниже ваше предложение."
        placeholder="Напишите ваше предложение"
      />
    </form>
  );
};

export { OfferForm };
