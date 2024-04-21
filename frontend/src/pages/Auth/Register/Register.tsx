import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { RegisterForm } from "./RegisterForm";
import { useUserRedirect } from "src/app/hocs/useUserRedirect";

const Register: React.FC = () => {
  useUserRedirect();
  return (
    <section className="wrapper">
      <h2 className="title">Регистрация</h2>
      <RegisterForm />
      <div className="buttons">
        <ButtonBase form="register">Войти</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
};

export { Register };
