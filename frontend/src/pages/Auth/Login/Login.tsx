import { ButtonBack } from "src/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";
import { LoginForm } from "./LoginForm";
import { useUserRedirect } from "src/app/hocs/useUserRedirect";


const Login: React.FC = () => {
  useUserRedirect()
  return (
    <section className="wrapper">
      <h2 className="title">Вход</h2>
      <LoginForm />
      <div className="buttons">
        <ButtonBase form="login">Войти</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
};

export { Login };
