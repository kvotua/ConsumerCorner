import { useUserRedirect } from "src/app/hocs/useUserRedirect";
import { ButtonBase } from "src/shared/Buttons/ButtonBase/ButtonBase";

const Home: React.FC = () => {
  useUserRedirect()
  return (
    <section className="wrapper justify-center items-center gap-5">
      <h2 className="title">Добро пожаловать!</h2>
      <div className="flex-grow w-full flex flex-col justify-center gap-5">
        <ButtonBase link="/login">Войти</ButtonBase>
        <ButtonBase link="/register" isActive={false}>
          Зарегестрироваться
        </ButtonBase>
      </div>
      <p className="text-center opacity-50 text-sm">
        Удобные инструменты позволяющие вашему бизнесу быть в курсе и оперативно
        реагировать на пожелания клиента
      </p>
    </section>
  );
};

export { Home };
