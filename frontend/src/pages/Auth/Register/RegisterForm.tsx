import { useContext } from "react";
import { useForm } from "react-hook-form";

import { IS_EMAIL } from "src/app/constants/email.constant";
import { ProgressContext } from "src/app/providers/ProgressProvider";
import { useRegisterUser } from "src/app/services/auth.service";
import { IUser } from "src/app/types/user.type";
import { TextFieldBase } from "src/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm<IUser>({ mode: "onBlur" });
  const { mutate: registerUser } = useRegisterUser();
  const { progress, setProgress } = useContext(ProgressContext);
  const registerForm = (data: IUser) => {
    if (progress === 1) {
      registerUser(data);
    } else {
      setProgress((prev) => prev + 1);
    }
  };
  return (
    <form
      onSubmit={handleSubmit((data) => registerForm(data))}
      className="flex-grow flex flex-col justify-center gap-2 py-5"
      id="register"
    >
      {progress === 0 && (
        <>
          <TextFieldBase
            label="Логин"
            {...register("login", {
              required: "Поле обязательно",
              minLength: 6,
            })}
            isError={!!errors.login}
            placeholder="Придумайте логин"
            subLabel="Минимум 6 символов"
          />
          <TextFieldBase
            {...register("email", {
              required: "Поле обязательно",
              pattern: { message: "Не верный email", value: IS_EMAIL },
            })}
            errorMessage={errors.email}
            type="email"
            label="Эл. почта"
            isError={!!errors.email}
            placeholder="example@example.com"
          />
          <TextFieldBase
            {...register("password", {
              required: "Пароль обязателен",
              minLength: { message: "Минимум 8 символов", value: 8 },
            })}
            label="Пароль"
            type="password"
            isError={!!errors.password}
            errorMessage={errors.password}
            placeholder="Придумайте пароль"
            subLabel="Минимум 8 символов"
          />
        </>
      )}
      {progress === 1 && (
        <>
          <TextFieldBase
            label="Имя"
            {...register("name", {
              required: "Имя обязательно",
            })}
            errorMessage={errors.name}
            isError={!!errors.name}
            placeholder="Введите имя"
          />
          <TextFieldBase
            label="Фамилия"
            {...register("surname", {
              required: "Фамилия обязательна",
            })}
            errorMessage={errors.surname}
            isError={!!errors.surname}
            placeholder="Введите фамилию"
          />
        </>
      )}
    </form>
  );
};

export { RegisterForm };
