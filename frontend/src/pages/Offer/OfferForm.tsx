import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAddComments } from "src/app/services/comments.service";
import { TextFieldBig } from "src/shared/Inputs/TextFields/TextFieldBig/TextFieldBig";

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
          pointID: pointId!,
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
