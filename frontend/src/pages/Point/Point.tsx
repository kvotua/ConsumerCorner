import axios from "axios";
import { ButtonEntrepreneur } from "../../shared/Buttons/ButtonEntrepreneur/ButtonEntrepreneur";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";

interface IPoint {
  title: string;
  address: string;
  id: string;
  owner: string;
}
const Point = () => {
  const { id } = useParams();
  const [point, setPoint] = useState<IPoint | null>(null);
  const getPoint = () => {
    axios
      .get(
        `http://xn--90abdibneekjf0abcbbqil3bejr0c1r.xn--p1ai:8000/points?pointID=${id}`
      )
      .then(({ data }) => {
        setPoint(data);
      });
  };
  useEffect(() => {
    getPoint();
  }, []);
  return (
    <div className="container bg-main h-screen pt-[100px]">
      <Link to={"/"}>
        <img src={logo} alt="" className="w-10 fixed top-5 left-5" />
      </Link>
      <h2 className="text-center text-originWhite text-[30px] font-bold ">
        {point?.title || "Название"}
      </h2>
      <span className="block text-center text-originWhite text-[16px] opacity-50 font-bold mb-10 w-[15rem] mx-auto break-words">
        {point?.address || "Адрес"}
      </span>
      <div className="grid grid-cols-2 gap-[10px]">
        <ButtonEntrepreneur title="Книга жалоб и предложений" link="comments" />
        <ButtonEntrepreneur
          title="Документы"
          handleClick={() => alert("В разработке")}
        />
        <ButtonEntrepreneur
          title="Соц.сети и сайт"
          handleClick={() => alert("В разработке")}
        />
      </div>
    </div>
  );
};

export default Point;
