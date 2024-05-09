import { ButtonBack } from "@/shared/Buttons/ButtonBack/ButtonBack";
import { ButtonBase } from "@/shared/Buttons/ButtonBase/ButtonBase";
import { LoginForm } from "./LoginForm";

export default function login () {
  return (
    <section className="wrapper container">
      <h2 className="title">Вход</h2>
      <LoginForm />
      <div className="buttons">
        <ButtonBase form="login">Войти</ButtonBase>
        <ButtonBack />
      </div>
    </section>
  );
};