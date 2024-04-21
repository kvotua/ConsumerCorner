import { useForm } from "react-hook-form";
import { useRegisterUser } from "src/app/services/auth.service";
import { IUser } from "src/app/types/user.type";
import { TextFieldBase } from "src/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUser>();
  const { mutate: registerUser } = useRegisterUser();
  const registerForm = (data: IUser) => {
    registerUser(data);
  };
  return (
    <form
      onSubmit={handleSubmit((data) => registerForm(data))}
      className="flex-grow flex flex-col justify-center gap-2 py-5"
      id="register"
    >
      <div className="flex gap-2 w-full">
        <TextFieldBase
          label="ФИО"
          {...register("name", {
            required: "Поле обязательно",
          })}
          isError={!!errors.name}
          placeholder="Иванов Иван Иванович"
        />
        <TextFieldBase
          label="Логин"
          {...register("login", {
            required: "Поле обязательно",
          })}
          isError={!!errors.login}
          placeholder="Login"
        />
      </div>
      <TextFieldBase
        {...register("email", {
          required: "Поле обязательно",
        })}
        type="email"
        label="Эл. почта"
        isError={!!errors.email}
        placeholder="example@example.com"
      />
      <TextFieldBase
        {...register("password", {
          required: "Поле обязательно",
          minLength: 8,
        })}
        label="Пароль"
        type="password"
        isError={!!errors.password}
        placeholder="**********"
        subLabel="Минимум 8 символов"
      />
    </form>
  );
};

export { RegisterForm };
