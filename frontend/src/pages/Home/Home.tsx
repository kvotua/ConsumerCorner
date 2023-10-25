import { useNavigate } from "react-router-dom";
import { ButtonEntrepreneur } from "../../shared/Buttons/ButtonEntrepreneur/ButtonEntrepreneur";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      return navigate("/points");
    }
  }, []);

  return (
    <div className="container h-screen bg-main pt-[100px] flex justify-center items-center gap-[10px]">
      <ButtonEntrepreneur breakAll title="Регистрация" link="/register" />
      <ButtonEntrepreneur breakAll title="Вход" link="/login" />
    </div>
  );
};

export { Home };
