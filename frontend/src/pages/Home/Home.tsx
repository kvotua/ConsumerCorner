import { ButtonEntrepreneur } from "../../shared/Buttons/ButtonEntrepreneur/ButtonEntrepreneur";

const Home = () => {
  return (
    <div className="container h-screen bg-main pt-[100px] flex justify-center items-center gap-[10px]">
      <ButtonEntrepreneur breakAll title="Регистрация" link="/register" />
      <ButtonEntrepreneur breakAll title="Вход" link="/login" />
    </div>
  );
};

export { Home };
