import { useForm } from "react-hook-form";
import { useLoginUser } from "src/app/services/auth.service";
import { ILogin } from "src/app/types/user.type";
import { TextFieldBase } from "src/shared/Inputs/TextFields/TextFieldBase/TextFieldBase";

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
          minLength: 8,
        })}
        label="Пароль"
        type="password"
        isError={!!errors.password}
        errorMessage={errors?.password}
        placeholder="**********"
        subLabel="Минимум 8 символов"
      />
    </form>
  );
};

export { LoginForm };
