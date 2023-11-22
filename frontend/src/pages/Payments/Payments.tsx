import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "src/hooks/useAppSelector";
import { usePostPaymentsMutation } from "src/store/RTKSlice/api";
import { ButtonBack } from "src/ui/Buttons/ButtonBack/ButtonBack";
import { ButtonSubmit } from "src/ui/Buttons/ButtonSubmit/ButtonSubmit";
import { Input } from "src/ui/Input/Input";
import { Title } from "src/ui/Title/Title";

const Payments = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userId = useAppSelector((state) => state.userSlice.id);
  const [addSum] = usePostPaymentsMutation();
  const onSubmit = (data: FieldValues) => {
    addSum({ userId, value: data.sum });
  };
  return (
    <div>
      <Title title="ПОПОЛНИТЬ БАЛАНС" />
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Input
          isError={!!errors.sum}
          errorMessage={errors.sum?.message}
          useForm={register("sum", {
            minLength: 1,
            required: "минимум 1 символ",
          })}
          title="Сумма"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 container flex flex-col gap-[10px] ">
          <ButtonSubmit title="Пополнить" type="submit" isActive />
          <ButtonBack />
        </div>
      </form>
    </div>
  );
};

export { Payments };
