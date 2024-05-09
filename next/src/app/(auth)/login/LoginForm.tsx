"use client";
import { useLoginUser } from "@/root/services/auth";
import { ILogin } from "@/root/types/user";
import { TextFieldBase } from "@/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";
import { useForm } from "react-hook-form";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const { mutate: loginUser } = useLoginUser();

  const login = (data: ILogin) => {
    loginUser(data);
  };
  return (
    <form
      onSubmit={handleSubmit((data) => login(data))}
      className="flex-grow flex flex-col justify-center gap-5"
      id="login"
    >
      <TextFieldBase
        label="Логин"
        {...register("login", {
          required: "Поле обязательно",
        })}
        isError={!!errors.login}
        errorMessage={errors?.login}
        placeholder="Login"
      />
      <TextFieldBase
        {...register("password", {
          required: "Поле обязательно",
        })}
        label="Пароль"
        type="password"
        isError={!!errors.password}
        errorMessage={errors?.password}
        placeholder="**********"
      />
    </form>
  );
};

export { LoginForm };
